<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="链接管理" name="first">
            
        <el-row>
            <el-col :span="4" :style="{textAlign: 'center'}">
                <el-button type="primary" size="mini"  v-on:click="addRow">增加</el-button>
            </el-col>
            <el-col :span="16">
                <el-alert
                    title="建议数量在1--10个,第一个链接可以独立设置样式,链接地址不可为空"
                    type="info">
                </el-alert>
            </el-col>
        </el-row>

        <el-row class="rows clearfix" v-for="(item,index) in infor.cityList" :key="index" style="border-bottom: 1px solid #ccc;">
            <el-col :span="8">
                <P>
                    <b class="sliderB" style="width: 40px; margin-bottom: 12px;">标题</b>
                    <el-input v-model="infor[item.linkTitles]" :class="item.linkTitles" v-on:change="ichange1(index,item.linkTitles)" placeholder="请输入标题" style="width: 150px;margin-bottom: 12px;"></el-input>
                </P>
                <P>
                    <b class="sliderB" style="width: 40px; margin-bottom: 12px;">链接</b>
                    <el-input v-model="infor[item.linkLinks]"  :class="item.linkLinks" v-on:change="ichange2(index,item.linkLinks)" placeholder="http://www.xxx.com" style="width: 150px; margin-bottom: 12px;"></el-input>
                </P>
                <P>
                    <b class="sliderB" style="width: 40px; margin-bottom: 12px;">提示</b>
                    <el-input v-model="infor[item.imgalt]" :class="item.imgalt" v-on:change="ichange4(index,item.imgalt)" placeholder="请输入提示" style="width: 150px; margin-bottom: 12px;"></el-input>
                </P>
            </el-col>

            <el-col :span="7">
                <P>
                    <b class="sliderB" style="width: 40px;margin-bottom: 12px;">打开</b>
                    <el-select v-model="infor[item.linkTargets]" 
                    laceholder="请选择" 
                    :class="item.linkTargets" 
                    v-on:change="ichange3(index,item.linkTargets)" 
                    style="width: 120px;margin-bottom: 12px;">
                        <el-option
                        :label="'新窗口'"
                        :value="'_self'">
                        </el-option>
                        <el-option
                        :label="'当前窗口'"
                        :value="'_blank'">
                        </el-option>
                    </el-select>
                </P>

                <P>
                    <b class="sliderB" style="width: 40px">图片:</b>
                    <el-select v-model="infor[item.isShowPics]"
                     placeholder="请选择" :class="item.isShowPics"  
                     v-on:change="ichange5(index,item.isShowPics)"
                     style="width: 120px;" >
                        <el-option
                        :label="'显示'"
                        :value="'true'">
                        </el-option>
                        <el-option
                        :label="'隐藏'"
                        :value="'flase'">
                        </el-option>
                    </el-select>
                </P>
            </el-col>

            <el-col :span="7">

                <el-button type="primary" size="mini" @click='selectPic("imgUrl",infor.imgUrl,index)'>{{ item.linkAddPic }}</el-button>
                <el-button type="primary" size="mini"  v-on:click="delpic(index)" >{{ item.linkDelPic }}</el-button>
                <img :src="item.imgUrl" style="width: 180px; height: 70px; border: 1px solid #ccc; margin-top: 6px;">
            </el-col>

            <el-col :span="2">
                <el-button type="warning" size="mini" v-on:click="deleteRow(index)">{{ item.linkDeletes }}</el-button>
            </el-col>
        </el-row>

        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理" name="second">
            <div class="setOne">
                <ul style="width:100%;">
                    <li v-for="(item,index) in infor.cityLists"
                    :key="index">
                    <my-icon v-model="infor.cityLists[index].iconCLass" :title="item.title"></my-icon>
                    </li>
                </ul>
            </div>
        </el-tab-pane> -->
    </el-tabs>
  </div>
  
</template>

<script>
import style from './style';

export default {
    name:'basic_links_edit2',
    data(){
        return {
            activeName2: 'first',
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
    methods:{
        handleClick(tab, event) {
        },
        delpic:function(num){
            this.infor.cityList[num].imgUrl = '';
            this.infor.cityLists[num].imgUrls = '';
            this.infor.imgUrls[num] = '';
        },
        selectPic(item,urls,num){
            var _this = this;
            let myurls = _this.infor.cityList[num].imgUrl;
            this.$store.state.showPicCon = true;
            this.$store.state.imgUrls = function (val,bol) {
            // 图片选择 最终是否点击确定按钮
            if(bol){
                // that.infor[item] = val;
                _this.infor.cityList[num].imgUrl =val;
                _this.infor.cityLists[num].imgUrls =val;
                _this.infor.imgUrls[num] =val;
            }else{
                // that.infor[item] = myurls;
                _this.infor.cityList[num].imgUrl =myurls;
                _this.infor.cityLists[num].imgUrls =myurls;
                _this.infor.imgUrls[num] =myurls;
            }
            
            }
        },
        deleteRow:function(num){
            if (this.infor.rowNumber<=1) {
               alert('最少一个链接');
            }else{
                this.infor.rowNumber--;
                this.infor.cityList.splice(num,1);
                this.infor.cityLists.splice(num,1);

                let arr = this.infor.cityList;
                for(let i=0; i<arr.length; i++){
                    // arr[i].imgUrls = "imgUrls" + (i + 1); 
                    // arr[i].imgalt = "imgalt" + (i + 1); 
                    // arr[i].isShowPics = "isShowPics3" + (i + 1); 
                    // arr[i].linkLinks = "link_href3" + (i + 1); 
                    // arr[i].linkTargets = 'linkTargets' + (i + 1); 
                    // arr[i].linkTitles = 'linkTitles' + (i + 1); 
                    // console.log(arr[i]);
                }
                // debugger;
            }
        },
        addRow:function(){
            if (this.infor.rowNumber > 19) {
                alert("最多只允许添加20个链接");
            }else{
                this.infor.rowNumber++;
                // debugger;
                var t = 'link_title' + this.infor.rowNumber, h = 'link_href' + this.infor.rowNumber,
                tar = 'link_target' + this.infor.rowNumber,a = 'imgalt' + this.infor.rowNumber,s = 'isShowPics' + this.infor.rowNumber,imgUrls = 'imgUrls' + this.infor.rowNumber;
                this.infor.cityList.push({
                    linkTitles: t,
                    linkLinks: h,
                    linkTargets: tar,
                    linkAddPic:'添加图',
                    linkDelPic:'删除图',
                    imgUrl:'',
                    isShowPic:'false',
                    isShowPics:s,
                    imgUrls:imgUrls,
                    imgalt:a,
                    linkDeletes: '删除行'
                });
                this.infor.cityLists.push({
                    title: '',
                    href: '',
                    target: '_self',
                    iconCLass:'',
                    imgalt:'',
                    isShowPic:'false',
                    isShowPics:'',
                    imgUrls:''
                });
            }
        },
        ichange1:function(index,value){
            this.infor.cityLists[index].title =$('.'+value+' input').val() ;
        },
        ichange2:function(index,value){
            this.infor.cityLists[index].href =$('.'+value+' input').val() ;
        },
        ichange4:function(index,value){
            this.infor.cityLists[index].imgalt =$('.'+value+' input').val() ;
        },
        ichange6:function(index,value){
            this.infor.cityLists[index].imgUrls =$('.'+value+' input').val() ;
        },
        ichange3:function(index,value){
            let _this = this;
            var t = setTimeout(function(){
                if ($('.'+value+' input').val() === '新窗口') {
                    _this.infor.cityLists[index].target ='_blank';
                }else{
                    _this.infor.cityLists[index].target ='_self';
                }
                clearTimeout(t);
            },100);
        },
        ichange5:function(index,value){
            var _this = this;
            // $('.'+value+' input').val()
            var t = setTimeout(function(){
                if ($('.'+value+' input').val() == '显示') {
                    _this.infor.cityLists[index].isShowPics ='true';
                }else{
                    _this.infor.cityLists[index].isShowPics ='fasle';
                }
                clearTimeout(t);
            },100);
        },
        clickIcon:function(item){
            if (this.infor.cityLists[this.infor.clickName].iconCLass == 'icon' + ' iconfont ' + item) {
                this.infor.cityLists[this.infor.clickName].iconCLass = '';
            }else{
                this.infor.cityLists[this.infor.clickName].iconCLass = 'icon' + ' iconfont ' + item;
            }
        }
    },
}
</script>

<style>
.rows b{
    display: inline-block;
    width: 50px !important;
    text-align: center;
}

.rows{
    margin: 6px 0;    padding-right: 32px;
}
</style>
