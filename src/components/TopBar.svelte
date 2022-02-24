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
      <div style="color: darkcyan;">{$courseTitle}</div>
      <div style="color: cadetblue;">{$subjectTilte}</div>
  </div>
</div>

<style scoped>

.component{

  display: flex;
  align-items: center;
  height: 7%;
}
.component >div{
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}
.lesson{

  width: 35%;
  background-color: cadetblue;
  border-radius: 4px 0 0 0;
  cursor: pointer;
  color: lightblue;

}
.lesson:hover{
  background-color: darkcyan;
}
.theme{
  background-color: #334;
  /*border-radius: 4px;*/
  width: 65%;
  /*margin-left: 5px;*/
  border-radius: 0 4px 0 0;
}
.theme>div{
  height: 50%;
  font-size: 14px;
}
.theme:hover{
  /*background-color: lightgreen;*/
}
@media (min-width: 600px){
  .theme{
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    align-content: center;
  }
}

@media (min-width: 1200px){
  .theme{
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;

  }
}
</style>