<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span @click="templet.p_select_parts('date_set')"
          @mouseover="templet.p_index_hover_parts('date_set')"
          @mouseout="templet.p_index_out_parts()">日期设置</span>
        <span
          @click="templet.p_select_parts('time_set')"
          @mouseover="templet.p_index_hover_parts('time_set')"
          @mouseout="templet.p_index_out_parts()"
        >时间设置</span>
    </div>


    <!--日期设置-->
    <div class="Routine_setting" v-show="$store.state.parts == 'date_set'">
      
    </div>

    <!--时间设置-->
    <div class="btn_setting" v-show="$store.state.parts == 'time_set'">
    </div>

  </div>
</template>

<script>
import style from './style';

export default {
    name:'basic_date_edit',
    props:{
    },
    data(){
        return {
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
        };
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      }
    },
    mounted(){
       
    }
}

</script>

<style scoped>

</style>
