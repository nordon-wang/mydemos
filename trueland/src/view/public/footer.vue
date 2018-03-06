<template>
  <div class="myfooter layout_footer layout_parent"
       :class="$store.state.editing_block =='footer' ? 'editing_block' : ''"
       @mouseenter="templet.p_editing_block_Mongolia($event,'footer')"
       @mouseleave="templet.p_Mongolia_close($event,'footer')"
  >
    <div class="editing_block_Mongolia"
         v-if="$store.state.editing_block != 'footer'"
         @click="templet.select_editing_block('footer')"
    >点击蒙层，开启底部编辑！</div>

    <Layout_row
      v-for="(val,i) in $store.state.footer"
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
  import Row from '../../base/one_row';

  export default {
    name: 'myfooter',
    data () {
      return {

      }
    },
    components:{
      Layout_row
    },

    mounted(){
      //row排序
      this.templet.p_row_sortable('layout_footer','footer');

    }
  }
</script>
