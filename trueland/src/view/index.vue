<template>
	<!-- 屏蔽右键  -->
	<div class="hello" oncontextmenu="return false" @mousedown="mousedown">
	<!-- <div class="hello"> -->
		<!--左侧栏-->
		<Left-sidebar></Left-sidebar>

		<!--顶部栏-->
		<top-bar></top-bar>

		<!--底部栏-->
		<bottom-bar></bottom-bar>

		<!--主体-->
<!--		<div class="subject" id="main-subject" :style="{height:`${subjectHeight}px`}">

		</div>-->
    <p style="height: 60px;"></p>
    <my-header></my-header>
    <my-body></my-body>
    <my-footer></my-footer>
    <div class="allMongolia"
         v-show="$store.state.module_name != '' && $store.state.module_name != 'basic_text_editor'"
         @click="templet.p_bottomBar_close()"
    ></div>

		<!-- 图片选择 -->
		<pic-select></pic-select>
		<edit-mask></edit-mask>

		<!-- 公用的框 -->
		<edit-public></edit-public>
    <!--<div class="Mongolia" v-if="$store.state.parts"></div>-->

    <!--样式保存-->
    <style-save v-if="$store.state.styleSave_IsOpen"></style-save>

    <!--icon选择-->
    <icon-search></icon-search>

	</div>
</template>

<script type="text/ecmascript-6">
	import TopBar from './public/topBar';
	import MyHeader from './public/header';
	import MyBody from './public/body';
	import MyFooter from './public/footer';
	import BottomBar from './dialog/bottomBar';
	import LeftSidebar from './dialog/leftSidebar';
	import picSelect from './public/pic_select';
	import editMask from './public/edit_mask';
	import editPublic from './dialog/edit_public';
  import StyleSave from './public/edit_styleSave.vue';

	export default {
		name: 'index',
		data() {
			return {
				subjectHeight: this.templet.screenHeight - 60,
				animatedArr : []

			}
		},
		components: {
			TopBar,
			BottomBar,
			MyHeader,
			MyBody,
			MyFooter,
			LeftSidebar,
			picSelect,
			editMask,
			editPublic,
      StyleSave
		},
		methods: {
			mousedown(e) {
				if(e.which == 3) {
					this.$store.state.parts = '';
				}
			}
		},
		updated(){
			this.$nextTick(function(){
				//将所有拥有动画的dom 去除dom的class
				let temArr = $('#app #main-subject .hasAnimated');
				for(let i=0,len = temArr.length; i<len;i++){
					// oldAnimated 若是旧的动画挂件  则不需要移除其动画的class
					if(!$(temArr[i]).hasClass('oldAnimated')){
						// $(temArr[i]).removeClass().addClass('animated hasAnimated oldAnimated');
						$(temArr[i]).addClass('oldAnimated');
					}
				}
			})
		},
		mounted() {


      const that = this;
      this.templet.p_init();//这个是正式接口的
    // this.templet.p_test();//这个是测试用的


			// 动画
			$(document).scroll( () => {
				this.templet.animatedAll();
			});

			//module悬浮状态
			$('#app').on('mouseover', '.mouseClass', function(e) {
				e.stopPropagation();
				$(this).addClass('index_Highlight_hover');
			});

			$('#app').on('mousedown', function(e) {
				//e.stopPropagation();
				if(e.which == 2) {
					alert(e.which);
				}
			});

			$('#app').on('mouseout', '.mouseClass', function(e) {
				e.stopPropagation();
				$(this).removeClass('index_Highlight_hover');

			});

			//row悬浮状态
			$('#app').on('mouseover', '.layout_row', function(e) {
				$(this).addClass('layout_row_hover');

			});

			$('#app').on('mouseout', '.layout_row', function(e) {
				$(this).removeClass('layout_row_hover');
			});

			//laybox 悬浮状态
			$('#app').on('mouseover', '.laybox', function(e) {
				e.stopPropagation();
				$(this).addClass('layout_row_hover');

			});

			$('#app').on('mouseout', '.laybox', function(e) {
				e.stopPropagation();
				$(this).removeClass('layout_row_hover');
			});





		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
