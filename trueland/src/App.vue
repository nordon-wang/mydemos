<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    $('.init_mongolia_layer').remove();
  }
}
</script>


