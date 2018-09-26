<template>
    <div :class="$style.centered">
      <h1 :class="$style.headingLarge">Not Found 404</h1>
      <p :class="$style.textLarge">Упсс, страница не найдена<br>
      <router-link :to="{name:'Home'}">
        Вернуться на главную страницу?
      </router-link></p>
    </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style module>
   .headingLarge{
     font-size: 100px;
   }
  .textLarge{
    font-size: 50px;
  }
  .centered{
    text-align: center;
  }
</style>
