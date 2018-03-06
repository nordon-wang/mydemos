<template>
  <div class="myheader layout_header layout_parent"
       :class="$store.state.editing_block =='header' ? 'editing_block' : ''"
       @mouseenter="templet.p_editing_block_Mongolia($event,'header')"
       @mouseleave="templet.p_Mongolia_close($event,'header')"
  >
    <div class="editing_block_Mongolia"
         v-if="$store.state.editing_block != 'header'"
         @click="templet.select_editing_block('header')"
    >点击蒙层，开启顶部编辑！</div>
    <Layout_row
      v-for="(val,i) in $store.state.header"
      :infor="val.data.infor"
      :widget-id="val.widgets_id"
      :children="val.children"
      :key="i"
      :rowType="val.rowType"
    ></Layout_row>

  </div>
</template>

<script>
  import Layout_row from '../../widgets/layout_row/index.vue';

  export default {
    name: 'myheader',
    data () {
      return {

      }
    },
    components:{
      Layout_row
    },

    mounted(){
      //row排序
      this.templet.p_row_sortable('layout_header','header');

    }
  }
</script>
