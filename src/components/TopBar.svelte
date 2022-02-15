<script>
import { screenIndex, courseID, subjectID, courseTitle, subjectTilte } from '../store/common.js'

function changeScreen(){
  if($screenIndex===0){
     $screenIndex = 1
  }
  else if($screenIndex===1){
      $screenIndex = 0
  }
}

$:title = `${$courseID} / ${$subjectID}`

</script>

<div class="component">
  <div class="lesson" on:click={changeScreen}>{title}</div>
  <div class="theme">
      <div>{$courseTitle}</div>
      <div>{$subjectTilte}</div>
  </div>
</div>

<style scoped>

.component{
  padding: 5px;
  display: flex;
  align-items: center;
  height: 7%;
}
.component >div{
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
}
.lesson{
  padding: 5px;
  width: 35%;
  background-color: purple;
  border-radius: 4px;
  cursor: pointer;
  color: wheat;
}
.lesson:hover{
  background-color: crimson;
}
.theme{
  background-color: green;
  border-radius: 4px;
  width: 65%;
  margin-left: 5px;

}
.theme>div{
  height: 50%;
  font-size: 14px;
}
.theme:hover{
  /*background-color: lightgreen;*/
}

</style>