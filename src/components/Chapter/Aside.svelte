<script>
import { notes, note, screenID, currentNoteIndex } from '../../store/common.js'
import Control from './AsideControl.svelte'


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

$note = defaultObj;



function selectNote (item, index){
  $currentNoteIndex = index
  $note = item;
  // снимаем выделение с активного элемента списка
  $notes.map( (item, index)=>$notes[index].active = false);
  //задаем выделение активному элементу списка
  $notes[index].active = true;
  //переключаемся компонент просмотра заметки
  $screenID = 'NoteView';
}


</script>

<div class="notes">
  <ul>
        {#each $notes as item, index}
            <li class="item {item.active?'active':''}" on:mousedown={()=>{selectNote(item, index)}}>{item.order}. {item.name}</li>
        {/each}
  </ul>
  <Control/>
</div>

<style scoped>

.notes{
  width: 35%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>