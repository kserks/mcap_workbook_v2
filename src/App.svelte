<script>
import TopBar from './components/TopBar.svelte'
import Main from './components/Main/Index.svelte'
import Chapter from './components/Chapter/Index.svelte'
import { screenIndex } from './store/common.js'

let screens = [ Main, Chapter]

</script>

<main>

  <TopBar/>
  <svelte:component this={screens[$screenIndex]}/>

	
</main>

<style>

main{
  width: 1024px;
  height: 768px;
  background-color: #445;
  border-radius: 5px;
  padding: 0px;
}


</style>