import StyleList from './style_list_config';
import Store from '../vuex/store';

//生成一个row的类
class OneRow {
  constructor({id,widgets_id,rowType = Store.state.editing_block, data = JSON.parse(JSON.stringify(StyleList['layout_row']))}){
    this.name = 'layout_row';
    this.pid = 0;
    this.widgets_id = widgets_id;
    this.data = data;
    this.rowType = rowType;
    this.children = [];
  }
}

export default OneRow;
