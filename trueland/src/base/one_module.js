import StyleList from './style_list_config';
import moduleCss from '../widgets/basic_module/style';

//生成一个module
//默认样式是每个挂件自己的默认样式 加上 module的默认样式
//这里的默认data，必须要深拷贝，
class OneModule {
  constructor({pid,name,widgets_id,rowType,data = JSON.parse(JSON.stringify(Object.assign(StyleList[name],moduleCss)))}){
    this.name = name;
    this.pid = pid;
    this.widgets_id = widgets_id;
    this.data = data;
    this.rowType = rowType;//父容器的类型
  }
}

export default OneModule;


