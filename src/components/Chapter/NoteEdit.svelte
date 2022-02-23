<script>
import { note, notes, isNew } from '../../store/common.js'
import base64 from '../../utils/base64.js'
import { onMount } from 'svelte'



let order = $note.order;
const orderInput = (e) => {
  let val = e.target.value;
  if(val.length>2){
    val = ''
  }
  if(isNaN(Number(val) )){
    val = '';
  }
  order = val
  $note.order = order
};

let title = $note.name;
const titleInput = (e) => {
  let val = e.target.value;
  if(val.length>68){
    val = '';
  }

  title = val;
  $note.name = title;
};

let content = base64.decode($note.content);
/*
if(base64.decode($note.content)!==content)

*/
const contentInput = (e) => {
  let val = e.target.value;
  content = val;
  $note.content = content;
};





</script>



<div class="content__header">
  <input type="text" bind:value="{order}" class="content__index" on:input={orderInput}/>
  <input type="text" bind:value="{title}" class="content__title" on:input={titleInput}/>
</div>
<textarea class="content__markdown" bind:value="{content}" on:input={contentInput}></textarea>


<style scoped>
textarea{
  resize: none;
  outline: 0;
  border: unset;
}
input{
    margin: 0;

}
.content__header{
  display: flex;
}
.content__header >input{
  border-radius: 4px;
  height: 30px;
  background-color: rgba(0, 100, 200, 0.2);
  display: flex;
  align-items: center;
  color: gray;
}
.content__index{
  width: 30px;
  text-align: center;

}
.content__title{
  margin-left: 5px;
  flex: 1 1 auto;
  padding-left: 10px;
}
.content__markdown{
  margin-top: 5px;
  margin-bottom: 0;
  border-radius: 4px;
  flex: 1;
  background-color: rgba(0, 100, 200, 0.2);
  word-break: break-word;
  padding: 5px;
  color: gray;
}


</style>