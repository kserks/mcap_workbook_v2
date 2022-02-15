<script>
import { notes, note } from '../../store/common.js'
import marked from '../../utils/marked.js'
import base64 from '../../utils/base64.js'



$:content = (()=>{
  let md = base64.decode($note.content)
  return marked.parse(md)
})()

</script>

<div class="component">
  <div class="content__header">
    <div class="content__index">{$note.index}</div>
    <div class="content__title">{$note.name}</div>
  </div>
  <div class="content__markdown">{@html content}</div>
  <div class="content__control">
      <div class="btn">Скрыть</div>
      <div class="btn">Востановить</div>
      <div class="btn">Изменить</div>
      <div class="btn mark">4</div>
  </div>
</div>

<style scoped>

.component{
  padding: 5px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: gray;
}

.content__header{
  display: flex;
}
.content__header >div{
  border-radius: 4px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
.content__index{
  width: 30px;
  justify-content: center;
}
.content__title{
  margin-left: 5px;
  flex: 1 1 auto;
  padding-left: 10px;
}
.content__markdown{
  margin-top: 5px;
  border-radius: 4px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  word-break: break-word;
  padding: 5px;
}

.content__control{
  display: flex;
  justify-content: space-between;
}
.content__control .btn{
  width: 24%;

}
.content__control .btn.mark{
  background-color: darkgreen;
  pointer-events: none;
}
</style>