<script>
import { note, notes, isNew, editedContent, focus } from '../../store/common.js'
import base64 from '../../utils/base64.js';
import { onMount } from 'svelte';


onMount(()=>{
  /*$focus for minecraft*/
  $focus.order = false;
  $focus.name = false;
  $focus.content = false;

})
/**
 * props
 */
export let order
export let name
export let content

$editedContent = base64.decode(content)


//let order = $note.order;
const orderInput = (e) => {
  let val = e.target.value;
  if(val.length>2){
    val = ''
  }
  if(isNaN(Number(val) )){
    val = '';
  }
  order = val;
  $note.order = order;
  /*$focus for minecraft*/

};

//let name = $note.name;
const nameInput = (e) => {
  let val = e.target.value;
  if(val.length>68){
    val = '';
  }
  name = val;
  $note.name = name;
/*$focus for minecraft*/

};

//let content2 = base64.decode(content);


const contentInput = (e) => {
  let val = e.target.value;
  $editedContent = val;
/*$focus for minecraft*/

};



</script>



<div class="content__header">
  <input type="text" bind:value="{order}" class="content__index {$focus.order?'focus':''}" on:input={orderInput} on:click={()=>{$focus.order = true;$focus.name = false;$focus.content = false;}}/>
  <input type="text" bind:value="{name}" class="content__name {$focus.name?'focus':''}" on:input={nameInput} on:click={()=>{$focus.name = true;$focus.order = false;$focus.content = false;}}/>
</div>
<textarea class="content__markdown {$focus.content?'focus':''}" bind:value="{$editedContent}" on:input={contentInput} on:click={()=>{$focus.order = false;$focus.name = false;$focus.content = true;}}></textarea>


<style>
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
.content__name{
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