<template>
  <div class="moduleEdit">

    <div class="row_setting">
      <div class="setOne">
        <my-border
          type="top"
          :my_width.sync="css.w_border_top_width"
          :my_color.sync="css.module_pulick_border_top_color"
          :my_style.sync="css.w_border_top_style"
        ></my-border>
        <my-border
          type="bottom"
          :my_width.sync="css.w_border_bottom_width"
          :my_color.sync="css.module_pulick_border_bottom_color"
          :my_style.sync="css.w_border_bottom_style"
        ></my-border>
        <my-border
          type="left"
          :my_width.sync="css.w_border_left_width"
          :my_color.sync="css.module_pulick_border_left_color"
          :my_style.sync="css.w_border_left_style"
        ></my-border>
        <my-border
          type="right"
          :my_width.sync="css.w_border_right_width"
          :my_color.sync="css.module_pulick_border_right_color"
          :my_style.sync="css.w_border_right_style"
        ></my-border>
      </div>

      <!-- 边框设置结束 -->

      <div class="setOne">
        <my-img v-model="css.w_bg_src"></my-img>
        <my-select v-model="css.w_tile_style" title="背景平铺" :option="$store.state.options.backgroundRepeat"></my-select>
        <my-select v-model="css.w_bg_position" title="背景位置" :option="$store.state.options.backgroundPosition"></my-select>
        <my-color v-model="css.w_background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="css.w_border_raduis_num" title="圆角"></my-number>
        <my-number v-model="css.w_opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>
        <my-number v-model="css.w_fill" title="填充"></my-number>
      </div>

    </div>
  </div>
</template>

<script>
import style from "./style";

export default {
  name: "basic_module_edit",
  props: {},
  data() {
    return {
      css: JSON.parse(JSON.stringify(this.$store.state.module_Data.data.css)),
      test: ""
    };
  },
  watch: {
    css: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key:'css',
          val:JSON.parse(JSON.stringify(val))
        });
      },
      deep: true
    }
  },
  methods: {},
  components: {},

  mounted() {
  }
};
</script>
