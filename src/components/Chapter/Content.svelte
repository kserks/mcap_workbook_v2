<script>
import { notes, note, screenID, isNew, subjectID, player, currentNoteIndex, editedContent } from '../../store/common.js';
import uid from '../../utils/uid.js';
import api from '../../utils/api.js';
import NoteView from './NoteView.svelte';
import NoteEdit from './NoteEdit.svelte';
import base64 from '../../utils/base64.js';
import getLinkout from '../../utils/get-linkout.js';
/**
 * SCREENS
 */
const _content = { NoteView, NoteEdit };
let success = false;
/**
 * props
 */
$:order = $note.order;
$:name = $note.name;
$:content = $note.content;


async function createNote (){
  $note.id = uid();
  $note.player = $player;
  $note.subject = $subjectID;
 /**/
  $note.order = +$note.order;
  //$note.name = $note.name;
  console.log($note.content)
  //console.log(base64.encode($note.content))
  $note.content = base64.encode($editedContent)
  let maxRes = await fetch(api.maxNotes($player));
  let max = await maxRes.json();
  let maxIndex = max.aggregations[0].value+1;
  $note.index =  maxIndex
  $note.linkout = getLinkout($player, maxIndex)
  
  try{
      await fetch(api.addNote, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify($note)
      })
      $note.active = true;
      $notes = [...$notes, $note]
      $screenID = 'NoteView';
      success = true;
      setTimeout(()=>success=false, 1500)
  }
  catch(e){
    console.error(e)
  }
}


/**
 * EDIT
 */

async function editNote (){


  if($screenID==='NoteEdit'){
        $screenID = 'NoteView'
        $note.content = base64.encode($editedContent)
        let obj = { ...$note }
        delete obj.active
        try{ 
          await fetch(api.put, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(obj)
                })
          /**
           * Получаем список заметок повторно из базы
           */

            fetch(api.workbooks($subjectID, $player))
              .then(r=>r.json())
              .then(r=>{
                  r.items.map( (n, i)=>{
                      n.active = false;
                  })
                  $notes = r.items;
                  success = true;
                  setTimeout(()=>success=false, 1500);
                  $notes[$currentNoteIndex].active = true
              })

        }
        catch(e){
          console.error(e)
        }  
  }
  else {
     $screenID = 'NoteEdit';
  }

}
function saveNote (){
  if($isNew){
      $isNew = false;
      createNote ();
  }
  else{
     editNote();
  }
}



async function hideNote (){
  // не скрывает только что созданную заметку
  // из за того, что currentNoteIndex 
  if($currentNoteIndex){    
        $notes[$currentNoteIndex].hide = true
        delete $notes[$currentNoteIndex].active
        try{
              await fetch(api.put, {
                          method: 'POST',
                          mode: 'cors',
                          body: JSON.stringify($notes[$currentNoteIndex])
              });
              let res = await fetch(api.workbooks($subjectID, $player))
              let _notesData = await res.json()
              $notes = _notesData.items
              order = '';
              name = '';
              content = '';
        }
        catch (e){
          console.error(e)
        }

  } 
}
async function restoreNote (){

 // mcap_slipers:fd-2
  let linkin = $note.linkin;

  //$currentNoteIndex = 
  if(linkin==='') return;
        try{
              // удаляем текующую заметку
              await fetch(api.deleteNote($note.id));
              // получаем оригинальную заметку
              let res = await fetch(api.linkout(linkin));
              let _originalNoteItems = await res.json();
              let _originalNote = _originalNoteItems.items[0]

              _originalNote.id = uid();
              _originalNote.player = $player
              _originalNote.linkin = _originalNote.linkout
              // получаем максимальный индекс
              let maxRes = await fetch(api.maxNotes($player));
              let max = await maxRes.json();
              let maxIndex = max.aggregations[0].value+1;
              _originalNote.index  = maxIndex
              _originalNote.linkout = getLinkout($player, maxIndex)
              // создаем новую заметку
              await fetch(api.addNote, {
                  method: 'POST',
                  mode: 'no-cors',
                  body: JSON.stringify(_originalNote)
              })
              // получаем список заметок
              let resNotes = await fetch(api.workbooks($subjectID, $player))
              let _notes = await resNotes.json()
              $notes = _notes.items
              order = '';
              name = '';
              content = ''

        }
        catch(e){
              console.error(e);
        }
}

</script>

<div class="content">

  <svelte:component this={_content[$screenID]} order={order} name={name} content={content}/>
  <div class="content__control">
      <div class="btn" on:click={hideNote}>Скрыть</div>
      <div class="btn" on:click={restoreNote}>Востановить</div>
      <div class="btn {success?'success':''}" on:click={saveNote}>{$screenID==='NoteView'?'Изменить':'Сохранить'}</div>
      <div class="btn mark">{$note.mark===0?'':$note.mark}{$note.remark===''?'':$note.remark}</div>
  </div>
</div>

<style scoped>

.content{
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  color: gray;
}

.content__control{
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}
.content__control .btn{
  width: 24%;

}
.content__control .btn.mark{
  background-color: rgba(0,0,0,0.1);
  pointer-events: none;
}
</style>