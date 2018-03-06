<template>
  <div class="effects_edit">
    <!-- edit_effects -->
        <div class="texiao">
          <div class="texiao-items"
           v-for="(items,index) in texiaoArr"
           :class="items.value == infor.effectsObj.type ? 'texiaoSele' : ''"
           @click="sele(items.value)"
           :key="index">
            <img :src="items.src">
            <p>{{items.title}}</p>
          </div>
        </div>
    <div class="setOne" v-if="infor.effectsObj.type == 'border'">
      <my-number v-model="infor.effectsObj.borderWidth" title="边框宽度"></my-number>
      <my-select v-model="infor.effectsObj.borderStyle" title="边框类型" :option="$store.state.options.borderStyle"></my-select>
      <my-color v-model="infor.effectsObj.borderColor" title="边框颜色"></my-color>
    </div>

    <div class="setOne" v-if="infor.effectsObj.type == 'scale'">
      <my-number v-model="infor.effectsObj.zoom" title="放大倍率"></my-number>
    </div>

    <div class="setOne" v-if="infor.effectsObj.type == 'translate'">
      <my-number v-model="infor.effectsObj.distance" title="位移距离" :min="-1000"></my-number>
    </div>

    <div class="setOne" v-if="infor.effectsObj.type == 'changeSrc'">
      <my-img v-model="infor.effectsObj.changeSrc"></my-img>
    </div>

    <div class="setOne" v-if="infor.effectsObj.type == 'rotate'">
      <my-number v-model="infor.effectsObj.deg" title="旋转角度" :min="-360"></my-number>
    </div>

    <div class="setOne" v-if="infor.effectsObj.type == 'icon'">
      <my-icon v-model="infor.effectsObj.icon"></my-icon>
      <my-number v-model="infor.effectsObj.iconSize" title="图标大小"></my-number>
      <my-color v-model="infor.effectsObj.iconColor" title="图标颜色"></my-color>
    </div>

  </div>
</template>

<script>
export default {
  name: "edit_effects",
  data() {
    return {
      infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
      texiaoArr: [
        {
          src:"/static/image/imageEffetc_thumb_1.jpg",
          title:'无效果',
          value:''
        },
        {
          src:"/static/image/imageEffetc_thumb_2.jpg",
          title:'边框特效',
          value:'border'
        },
        {
          src:"/static/image/imageEffetc_thumb_3.jpg",
          title:'icon蒙层',
          value:'icon'
        },
        {
          src:"/static/image/imageEffetc_thumb_4.jpg",
          title:'放大特效',
          value:'scale'
        },
        {
          src:"/static/image/imageEffetc_thumb_5.jpg",
          title:'位移特效',
          value:'translate'
        },
        {
          src:"/static/image/imageEffetc_thumb_6.jpg",
          title:'图片切换',
          value:'changeSrc'
        },
        {
          src:"/static/image/imageEffetc_thumb_6.jpg",
          title:'旋转特效',
          value:'rotate'
        }
      ]
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

  },
  methods: {
    sele(val){
      this.infor.effectsObj.type = val;
    }
  }
};
</script>

<style scoped>
.texiao {
  width: 960px;
  margin-top:10px;
  margin-bottom:10px;
  text-align: center;
}
.texiao .texiao-items {
  display: inline-block;
  width: 128px;
  height: 102px;
  border: 1px solid transparent;
  margin-right:5px;
}
.texiao .texiao-items:hover {
  border: 1px solid #557ce1;
}

.texiao .texiao-items img {
  width: 126px;
  height: 80px;
  cursor: pointer;
}
.texiaoSele{
  border: 1px #5874d8 solid !important;
}
</style>
