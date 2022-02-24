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
  width: 100vw;
  height: 100vh;
  background-color: #445;
  border-radius: 5px;
  padding: 10px;
}


</style>