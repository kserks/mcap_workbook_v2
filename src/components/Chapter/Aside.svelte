<script>
import { notes, note } from '../../store/common.js'

function selectNote (item){
  $note = item
}

</script>

<div class="component">
  <ul>
        {#each $notes as item, index}
            <li class="item" on:mousedown={()=>{selectNote(item)}}>{item.name}</li>
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