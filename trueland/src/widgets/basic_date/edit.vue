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
      <div class="setOne">
        <my-select v-model="infor.date_is_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.date_mr" title="右间距"></my-number>
        <my-color v-model="infor.date_color" title="字体颜色"></my-color>
        <my-number v-model="infor.date_fs" title="字体大小"></my-number>
      </div>
      <div class="setOne">
        <my-input v-model="infor.year" title="年"></my-input>
        <my-input v-model="infor.month" title="月"></my-input>
        <my-input v-model="infor.day" title="日"></my-input>
      </div>
    </div>

    <!--时间设置-->
    <div class="btn_setting" v-show="$store.state.parts == 'time_set'">
      <div class="setOne">
        <my-select v-model="infor.time_is_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-color v-model="infor.time_color" title="字体颜色"></my-color>
        <my-number v-model="infor.time_fs" title="字体大小"></my-number>
      </div>
      
      <div class="setOne">
        <my-input v-model="infor.hours" title="时"></my-input>
        <my-input v-model="infor.minutes" title="分"></my-input>
        <my-input v-model="infor.seconds" title="秒"></my-input>
      </div>
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
