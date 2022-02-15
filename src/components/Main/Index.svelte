<script>
import { screenIndex, courseID, subjectID, courseTitle, subjectTilte, notes, player } from '../../store/common.js'
import query from '../../utils/query.js'

let courses = []
let subjects = []
/**
 * Получаем массив курсов
 */

fetch(query.courses())
  .then(r=>r.json())
  .then(r=>{
      courses = r.items.map(item=>{
                    //расширяем урок свойством active для отображения активного элемента
                    item.active = false
                    return item
               })
  })

/**
 * Выбираем курс
 */
function selectCourse(item, index){
  $courseID = item.id
  $courseTitle = item.name
  // убираем класс active
  courses.forEach(item=>item.active=false)
  // навешиваем класс active на выбранный элемент
  courses[index].active = true
  /**
   * Получаем массив занятий
   */
  fetch(query.subjects($courseID))
    .then(r=>r.json())
    .then(r=>{
        subjects = r.items.map(item=>{
                    //расширяем урок свойством active для отображения активного элемента
                    item.active = false
                    return item
               })
    })
}


function selectSubject(item, index){
  $subjectID = item.id
  $subjectTilte = item.name

  /**
   * Получаем массив заметок
   */
  fetch(query.workbooks($subjectID, $player))
  .then(r=>r.json())
  .then(r=>{
      $notes = r.items
      /**
       * Переключаемся на экран отображения заметки
       */
      $screenIndex = 1
  })
 
}

</script>

<div class="component">
    <ul class="left">
        {#each courses as item, index}
            <li class="item {item.active?'active':''}" on:mousedown={()=>{selectCourse(item, index)}}>{item.name}</li>
        {/each}
    </ul>
    <ul class="right">
        {#each subjects as item, index}
            <li class="item" on:mousedown={()=>{selectSubject(item, index)}}>{item.name}</li>
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