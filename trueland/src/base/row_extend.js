import Person from './row';
import Store from '../vuex/store';
import moduleStyle from './style_list_config';
import { loadavg } from 'os';
import { log, debug } from 'util';
class Child_Templet extends Person {
	constructor(...args) {
		super(...args);
		//这里定义属性



	}

	t_change_size({ id, name, type, rowIndex, moduleIndex, width, height }) {
		if (name == 'basic_picture') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.picture_width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.picture_height = height;
			return false;
		}
		else if (name == 'basic_date') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
		else if (name == 'basic_goback') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.goback_a_width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.goback_a_height = height;
			return false;
		}
		else if (name == 'basic_location') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
		else if (name == 'basic_locationtitle') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
		else if (name == 'basic_video') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.videoWidth = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.videoHeight = height;
			return false;
		}
		else if (name == 'basic_searchs') {
			// 样式类型 根据搜索的样式类型进行宽高缩放
			let search_oppen_style = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_oppen_style;

			switch (search_oppen_style) {
				case '0':
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_width = width;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_height = height;
					break;
				case '1':
					// 按钮图标的高度
					let btnIconHeight = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_div_height;
					// 输入框的高度
					let inputHeight = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_height;
					// 按钮图标和输入框的距离 就是按钮图标的下间距 最小为0
					let myHeight = height - btnIconHeight - inputHeight
					myHeight = myHeight >= 0 ? myHeight : 0;

					// 输入框的宽度 最小不能小于 按钮图标的左内间距 + 图标的大小
					let paddingL = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_padding_left;
					let iconFS = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_fs;
					let myWidth = paddingL + iconFS;
					myWidth = width >= myWidth ? width : myWidth;

					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_width = myWidth;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_margin_bottom = myHeight;
					break;
				case '2':
					// 按钮图标的高度
					let btnIconHeight2 = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_div_height;
					// 输入框的高度
					let inputHeight2 = 40;
					// 按钮图标和输入框的距离 就是按钮图标的下间距 最小为0
					let myHeight2 = height - btnIconHeight2 - inputHeight2
					myHeight2 = myHeight2 >= 0 ? myHeight2 : 0;

					// 输入框的宽度 最小不能小于 按钮图标的左内间距 + 图标的大小
					let paddingL2 = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_padding_left;
					let iconFS2 = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_fs;
					let myWidth2 = paddingL2 + iconFS2;
					myWidth2 = width >= myWidth2 ? width : myWidth2;

					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_width = myWidth2;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_margin_bottom = myHeight2;
					break;
				case '3':
					// 图标left = width - 图标width
					let iconLeft = width - Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_div_width;
					iconLeft = iconLeft >= 50 ? iconLeft : 50;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_margin_left = iconLeft;

					// 输入框width = width - 图标width - 输入框left 
					let inputWidth = width - Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_div_width - Store.state[type][rowIndex].children[moduleIndex].data.infor.search_margin_left;
					inputWidth = inputWidth >= 40 ? inputWidth : 40;
					
					// 高度 = 按钮图标的高度
					// 最小高度不能小于 输入框高 + 输入框top
					let inputHeight3 = Store.state[type][rowIndex].children[moduleIndex].data.infor.search_height + Store.state[type][rowIndex].children[moduleIndex].data.infor.search_margin_top;
					height = height >= inputHeight3 ? height : inputHeight3;

					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_width = inputWidth + 12;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_btn_icon_div_height = height;
					break;
				case '4':
					// 输入框width = width - 图标width - 输入框left 
					let inputWidth4 = width - Store.state[type][rowIndex].children[moduleIndex].data.infor.search5_select_width - Store.state[type][rowIndex].children[moduleIndex].data.infor.search5_icon_width;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_width = inputWidth4;

					// 高度 三者保持一致
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search_height = height;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search5_select_height = height;
					Store.state[type][rowIndex].children[moduleIndex].data.infor.search5_icon_height = height;
					break;

			}

			return false;
		}
		else if (name == 'basic_language') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.w_languageWidth = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.w_languageHeight = height;
			return false;
		}
		else if (name == 'basic_customedit') {
			
			// 高度不能小于customHeight
			let customID  = 'u' +  Store.state[type][rowIndex].children[moduleIndex].widgets_id;
			let customHeight  = $(`#${customID} div.customeditCon`).height();
			height = height <= customHeight ? customHeight : height;

			// 宽度最小为80
			width  = width <= 80 ? 80 : width;
			
			Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
		else if (name == 'basic_gratext') {
			Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
		else if (name == 'basic_links') {
			// Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
			// Store.state[type][rowIndex].children[moduleIndex].data.infor.height = height;
			return false;
		}
	}

	// 滚动动画
	animatedAll() {
		// 滚动的高度
		let scrollHeight = $(document).scrollTop() + $(window).height();
		// 所有拥有动画的dom
		let arrs = $('#app .hasAnimated');

		for (let i = 0, len = arrs.length; i < len; i++) {
			// dom距离顶部的距离 就是当显示一半的时候 触发动画  
			let domTop = $(arrs[i]).height() / 2 + arrs[i].offsetTop + $(arrs[i]).parents('div.layout_row')[0].offsetTop;
			// 获取三个参数 可以拿到所在的row moudule 和 row的类型
			let _pid = arrs[i].getAttribute('pid');
			let _rowtype = arrs[i].getAttribute('rowtype');
			let _id = arrs[i].getAttribute('id').substr(1);

			let IndexObj = this.p_find_moduleIndex({
				pid: _pid,
				type: _rowtype,
				id: _id
			});

			let rowIndex = IndexObj.row;
			let moduleIndex = IndexObj.module;
			let rowtype = arrs[i].getAttribute('rowtype');
			let animateObj = Store.state[rowtype][rowIndex].children[moduleIndex].data['animateObj'];
			// 动画的需要的类名
			let animateClass = animateObj.animatedType + animateObj.animatedState;

			if (scrollHeight >= domTop) {
				// 是否多次触发 通过类名进行控制
				if (animateObj.animatedIterationCount == 'true' || animateObj.animatedIterationCount == true) {
					$(arrs[i]).addClass(animateClass);
				} else {
					//  若是单次触发  触发一次 便不再进入
					if (!$(arrs[i]).hasClass('oneCountAnimate')) {
						$(arrs[i]).addClass(animateClass).addClass('oneCountAnimate');
					}
				}

			} else {
				$(arrs[i]).removeClass(animateClass);
			}
		}
	}
}

export default Child_Templet;
