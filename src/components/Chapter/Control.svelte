<script>
import {  screenID, isNew, note, notes, player } from '../../store/common.js';
import getLinkout from '../../utils/get-linkout.js';
import api from '../../utils/api.js'
import uid from '../../utils/uid.js';
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

function shareLink (){
  let linkout = getLinkout($player, 3);
  console.log(linkout)
};

let targetLink = ''
function getSharedNote (){
  
  let isExists = $notes.find(item=>item.linkin===targetLink);
  if(!isExists){

    fetch(api.linkout(targetLink))
      .then(r=>r.json())
      .then(async r=>{
          let obj = r.items[0];
          obj.id = uid();
          obj.player = $player
          await fetch(api.addNote, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(obj)
          })
          $notes = [...$notes, obj]
      })
  }

 
};
</script>

<div class="component">
  <div class="item">
      <input type="text" placeholder="ссылка" bind:value="{targetLink}">
      <div class="btn" on:click={getSharedNote}>Дай списать</div>
  </div>
  <div class="item">
      <input type="text" placeholder="* или Имя" bind:value="{targetPlayer}">
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