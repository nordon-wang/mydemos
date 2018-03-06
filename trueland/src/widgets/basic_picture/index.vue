<template>
  <div class="picture mouseClass">
    <!--编辑框-->
    <div class="public_edit" >
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_picture')">整体编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="特效选择">
          <li class="edit_module" @click.stop="select_parts('','public_effects')">
            <span class="el-icon-news"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div class="img-con" :style="imgCon" @dblclick.stop="select_parts('select_img','basic_picture')">
      <!-- <a href="######"> -->
        <!--<img :src="infor.imgUrl"
      :style="imgStyle" >-->
        <img-effect
          :src="infor.imgUrl"
          :effectsObj="infor.effectsObj"
          classname="banner_img"
          :styleObj="imgStyle"
        ></img-effect>
      <!-- </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "basic_picture",
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    pid: {
      type: String,
      default: ""
    },
    rowType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showToolBar: false
    };
  },
  computed: {
    imgStyle() {
      return {
        border: "0 solid transparent",
        width: this.infor.picture_width + "px",
        height: this.infor.picture_height + "px",
        borderRadius: this.infor.picture_border_radius + "px"
      };
    },
    imgCon() {
      return {
        width: this.infor.picture_width + "px",
        height: this.infor.picture_height + "px",
        borderRadius: this.infor.picture_border_radius + "px",
        overflow: "hidden"
      };
    }
  },
  components: {},
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    }
  },
  mounted() {

  }
};
</script>
<style>
.picture {
  position: relative;
  border: 1px solid transparent;
}

.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active {
  -webkit-transition: all 0s linear 0s !important;
  transition: all 0s linear 0s !important;
}
.el-fade-in-enter,
.el-fade-in-leave-active,
.el-fade-in-linear-enter,
.el-fade-in-linear-leave,
.el-fade-in-linear-leave-active,
.fade-in-linear-enter,
.fade-in-linear-leave,
.fade-in-linear-leave-active {
  opacity: 0.5 !important;
}

.fades-enter-active,
.fades-leave-active {
  transition: all 0s;
}
.fades-enter,
.fades-leave-to,
.fade-leave-active {
  opacity: 1;
  transition: all 0s;
}

</style>
