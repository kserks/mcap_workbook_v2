<script>


</script>

<div class="component">
  <div class="item">
      <input type="text" placeholder="ссылка">
      <div class="btn">Дай списать</div>
  </div>
  <div class="item">
      <input type="text" placeholder="* или Имя">
      <div class="btn">Кинуть ссылку</div>
  </div>
  <div class="btn new">Новая</div>
</div>

<style scoped>

.component{
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 200, 0, 0.1);
}
.item{
  display: flex;
}

.btn.new{
  width: 100%;
}
</style>