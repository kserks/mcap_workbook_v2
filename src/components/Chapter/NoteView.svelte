<script>
import { note } from '../../store/common.js'

import marked from '../../utils/marked.js'
import base64 from '../../utils/base64.js'
import { onMount } from 'svelte'

export let order
export let name
export let content

$:mdContent = marked.parse(base64.decode(content))
</script>


  <div class="content__header">
    <div class="content__index">{order}</div>
    <div class="content__title">{name}</div>
  </div>

  <div class="content__markdown">{@html mdContent}</div>


<style scoped>
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
  overflow: auto;
}
</style>