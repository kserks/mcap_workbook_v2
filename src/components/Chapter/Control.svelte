<script>
import {  screenID, isNew, note, notes } from '../../store/common.js'
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
  "hide": false,
  active: true
}

function createNote (){
  $notes.map( (item, index)=>$notes[index].active = false);
  $note = defaultObj
  $screenID = 'NoteEdit'
  $isNew = true;
}

</script>

<div class="component">
  <div class="item">
      <input type="text" placeholder="ссылка">
      <div class="btn">Дай списать</div>
  </div>
  <div class="item">
      <input type="text" placeholder="* или Имя">
      <div class="btn">Кинуть ссылку</div>
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