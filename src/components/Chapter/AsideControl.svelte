<script>
import {  screenID, isNew, note, notes, player } from '../../store/common.js';
import getLinkout from '../../utils/get-linkout.js';
import api from '../../utils/api.js'
import uid from '../../utils/uid.js';
import {onMount} from 'svelte';
import mcefQuery from '../../methods/mcef-query.js';


/**
 * focus
 */
//let focus_link = false;
//let focus_share = false;





const defaultObj = {
  "id": "",
  "player": "",
  "subject": "",
  "index": 1,
  "order": '',
  "name": "",
  "content": "",
  "linkin": "",
  "linkout": "",
  "mark": 0,
  "remark": "",
  "hide": false
}

function createNote (){
  $notes.map( (item, index)=>$notes[index].active = false);
  $note = defaultObj;

  $screenID = 'NoteEdit'
  $isNew = true;
};

let targetPlayer = '';

async function shareLink (){

  if($note.linkout==='') return;
  let body;
  if(targetPlayer==='*'){
      body = `CMD_{
        "action": "command_say",
        "data": "${$note.linkout}",
        "type": "player",
        "dts": 1644914843,
        "ars": true 
      }`
  }
  else if(targetPlayer!=''){
      body = `CMD_{
        "action": "command_msg",
        "data": "${$note.linkout}",
        "type": "player",
        "dts": 1644914843,
        "ars": true 
      }`
  }
  else{
    return;
  }
  targetPlayer = '';
  await mcefQuery(body);

};

/**
 * Списать заметку
 */
let success = false;
let targetLink = '';
function getSharedNote (){
  /*focus*/
  //focus_link = false;
  //focus_share = false;
  let isExists = $notes.find(item=>item.linkin===targetLink);
  let isMyLink = $notes.find(item=>item.linkout===targetLink);
  if(!isExists&&!isMyLink){

    fetch(api.linkout(targetLink))
      .then(r=>r.json())
      .then(async r=>{
          let obj = r.items[0];
          obj.id = uid();
          obj.player = $player;
          // get max index
          let maxRes = await fetch(api.maxNotes($player));
          let max = await maxRes.json();
          let _max = max.aggregations[0].value;
          obj.linkin = obj.linkout;
          obj.linkout =  getLinkout($player, _max+1);
          obj.index = _max+1;
          // добавляем заметку
          try{
              await fetch(api.addNote, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(obj)
              })
              targetLink = '';
              $notes = [...$notes, obj]
              // красим кнопку в зеленый
              success = true;
              setTimeout(()=>success=false, 1500);
              $notes.map(i=>i.active=false);

          }
          catch(e){
            console.error(e)
          }
      })
  }

 
};




</script>

<div class="component">
  <div class="item">
      <input type="text" placeholder="ссылка" bind:value="{targetLink}" />
      <div class="btn {success?'success':''} " on:click={getSharedNote}>Дай списать</div>
  </div>
  <div class="item">
      <input type="text" placeholder="* или Имя" bind:value="{targetPlayer}"/>
      <div class="btn" on:click={shareLink}>Кинуть ссылку</div>
  </div>
  <div class="btn new" on:click={createNote}>Новая</div>
</div>

<style scoped>

.component{
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5px;
}
.item{
  display: flex;
  justify-content: space-between;
}
.btn{
  width: 49%;
}
.btn.new{
  width: 100%;
}
input{
  height: 27px;
  background-color: rgba(0,0,0,0.5);
  width: 49%;
  color: wheat;
}


</style>