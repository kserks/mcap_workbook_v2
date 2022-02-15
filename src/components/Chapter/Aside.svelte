<script>
import { notes, note } from '../../store/common.js'

function selectNote (item, index){
  $note = item
  $notes.forEach(item=>item.active = false)
  $notes[index].active = true
}

</script>

<div class="component">
  <ul>
        {#each $notes as item, index}
            <li class="item {item.active?'active':''}" on:mousedown={()=>{selectNote(item, index)}}>{item.order}. {item.name}</li>
        {/each}
  </ul>

</div>

<style scoped>

.component{
  width: 40%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 5px;
  /*height: 70%;*/
}

</style>