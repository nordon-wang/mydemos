<template>
  <div class="mybody layout_body layout_parent"
       :class="$store.state.editing_block =='body' ? 'editing_block' : ''"
       @mouseenter="templet.p_editing_block_Mongolia($event,'body')"
       @mouseleave="templet.p_Mongolia_close($event,'body')"
  >

    <div class="editing_block_Mongolia"
         @click="templet.select_editing_block('body')"
         v-if="$store.state.editing_block != 'body'"
    >点击蒙层，开启中部编辑！</div>

    <Layout_row
      v-for="(val,i) in $store.state.body"
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
  import Module from '../../base/one_module';
  export default {
    name: 'mybody',
    data () {
      return {
        list:[1,2,3,4,5,5,6]
      }
    },
    components:{
      Layout_row
    },

    mounted(){
      //row排序
      this.templet.p_row_sortable('layout_body','body');



    }
  }
</script>
