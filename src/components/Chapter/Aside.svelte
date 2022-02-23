<script>
import { notes, note, screenID } from '../../store/common.js'
import Control from './Control.svelte'


function selectNote (item, index){
  $note = item;
  $notes.forEach(item=>item.active = false);
  $notes[index].active = true;
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