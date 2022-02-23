<script>
import { notes, note, screenID, isNew, subjectID, player } from '../../store/common.js';
import uid from '../../utils/uid.js';
import api from '../../utils/api.js';
import NoteView from './NoteView.svelte';
import NoteEdit from './NoteEdit.svelte';
import base64 from '../../utils/base64.js';



async function createNote (){
  $note.id = uid();
  $note.player = $player;
  $note.subject = $subjectID;
  $note.index = 3; /**/
  $note.order = +$note.order;
  //$note.name = $note.name;
  $note.content = base64.encode($note.content);


  $screenID = 'NoteView';
  try{
      await fetch(api.addNote, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify($note)
      })
      $notes = [...$notes, $note]

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
        $note.content = base64.encode($note.content)
        let obj = { ...$note }
        delete obj.active
        try{ 
          await fetch(api.put, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(obj)
                })
          console.log($note)
        }
        catch(e){
          console.error(e)
        }  
  }
  else {
     $screenID = 'NoteEdit'
  }

}
function save (){
  if($isNew){
      $isNew = false
      createNote ();
  }
  else{
     editNote()
  }
}

const _content = { NoteView, NoteEdit }

</script>

<div class="content">

  <svelte:component this={_content[$screenID]}/>
  <div class="content__control">
      <div class="btn">Скрыть</div>
      <div class="btn">Востановить</div>
      <div class="btn" on:click={save}>{$screenID==='NoteView'?'Изменить':'Сохранить'}</div>
      <div class="btn mark">{$note.mark===0?'':$note.mark}</div>
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