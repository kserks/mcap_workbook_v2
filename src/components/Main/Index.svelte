<script>
import { screenIndex, courseID, subjectID, courseTitle, subjectTilte, notes, player } from '../../store/common.js'
import query from '../../utils/query.js'

let courses = []
let subjects = []
fetch(query.courses())
  .then(r=>r.json())
  .then(r=>{
      courses = r.items
  })

function selectCourse(item){
  $courseID = item.id
  $courseTitle = item.name
  fetch(query.subjects($courseID))
    .then(r=>r.json())
    .then(r=>{
        subjects = r.items
    })
}
function selectSubject(item){
  $subjectID = item.id
  $subjectTilte = item.name
  fetch(query.workbooks($subjectID, $player))
  .then(r=>r.json())
  .then(r=>{
      $notes = r.items
      $screenIndex = 1
      console.log($notes)
  })
 
}

</script>

<div class="component">
    <ul class="left">
        {#each courses as item, index}
            <li class="item" on:mousedown={()=>{selectCourse(item)}}>{item.name}</li>
        {/each}
    </ul>
    <ul class="right">
        {#each subjects as item, index}
            <li class="item" on:mousedown={()=>{selectSubject(item)}}>{item.name}</li>
        {/each}
    </ul>
</div>

<style scoped>
.component{
  display: flex;
  height: 93%;
  justify-content: space-between;
}
.component>ul{
  width: 49.8%;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 5px;

}
.left{

}

.right{

}


</style>