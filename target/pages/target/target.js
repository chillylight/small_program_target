// pages/item/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAdd:false,
    isShowDevide:true,
    selectImg:false,
    todoValue:'',
    targetList:[],
    id:1,
    checked:false
  },
  onShow: function () {
    this.showList()
  },
  showList:function(){
    // 渲染任务列表
    let targetList=  wx.getStorageSync('targetList')
    if (targetList) {
      let count = this.countUnChecked();
      if (count > 0){
        this.setData({
          isShowDevide:true
        })
      }else{
        this.setData({
          isShowDevide: false
        })
      }
      this.setData({
        targetList:targetList
      })
    }else{
      this.setData({
        isShowDevide:false
      })
      console.log(this.data.targetList)
    }
  },
  countUnChecked:function(){
    let targetList = wx.getStorageSync('targetList');
    let count = 0;
    for (let i = 0; i < targetList.length; i++) {
      if (targetList[i].checked == false) {
        count++;
      }
    }
    return count;
  },
  addTap: function () {
    this.setData({
      isShowAdd: true     
    })
    this.getId()
    //this.remove()
  },
  getId:function(){
    // 获取id
    let that = this;
    let is_data = wx.getStorageSync('targetList');
    let id;

    if (is_data == '') {
      that.setData({
        id:1  
      })
    }else{
      id = wx.getStorageSync('targetList')[0].id;
      that.setData({
        id:id+1
      })
    }
  },
  hideAdd: function () {
    // 显示隐藏添加输入框
    this.setData({
      isShowAdd: false
    })
  },
  todo:function(e){
    // 输入框输入时判断是否为空，非空时todoValue的值为输入值，并让图标高亮
    if (e.detail.value != 0) {
      this.setData({
        selectImg:true,
        todoValue:e.detail.value
      })
    }else{
      this.setData({
        selectImg:false,
        todoValue:e.detail.value
      })
    }
  },
  remove:function(){
    // 删除储存
    wx.removeStorage({
      key: 'todolist',
      success: function(res) {
        console.log(res.data)
      } 
    })
  },
  changeCheck:function(e){
    let id = e.currentTarget.dataset.id;
    let i = this.whichOne(id);
    let checked = "targetList["+i+"].checked";
    let ischeck = e.currentTarget.dataset.checked;
    let points = e.currentTarget.dataset.points;
    if (points == '') {
      points = "达成愿望";
    }else{
      points = '达成愿望消耗'+points+'分';
    }

    this.setData({
      [checked]:!ischeck
    })
    wx.showToast({
        title: points,
        icon:"none",
        duration: 1000,
        mask:true
    })
    wx.setStorageSync('targetList', this.data.targetList);
  },

  cancelCheck:function(e){
    let id = e.currentTarget.dataset.id;
    let i = this.whichOne(id);
    let checked = "targetList["+i+"].checked";
    let ischeck = e.currentTarget.dataset.checked;
    let points = e.currentTarget.dataset.points;
    if (points == '') {
      points = "愿望未达成";
    }else{
      points = '愿望未达成恢复'+points+'分';
    }

    this.setData({
      [checked]:!ischeck
    })
    wx.showToast({
        title: points,
        icon:"none",
        duration: 1000,
        mask:true
    })
    wx.setStorageSync('targetList', this.data.targetList);
  },

  whichOne:function(id){
    // 获取点击的数组是第几个
    let targetList=  wx.getStorageSync('targetList');

    for (let i = 0; i < targetList.length; i++) {
      if (targetList[i].id == id) {
        return i;
      }
    }
  },
  submitTodo:function(){
    // 点击提交时执行的操作
    let doDetail = this.data.todoValue;
    let id = this.data.id;
    let targetList = this.data.targetList;

    let msg = {
      "id":id,
      "name":doDetail,
      "checked":false,
      "points":'',
      "cycle":'',
      "detail":''
    };
    
    targetList.unshift(msg);
    wx.setStorageSync('targetList', targetList);

    // 点击提交时将input框清空
    this.setData({
      todoValue:''
    })
    this.hideAdd();
    this.showList();
  },
  toDetailPage:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../targetDetail/targetDetail?id=' + id
    })
  },
  viewTap:function(){
    this.setData({
      isShowAdd: false
    })
  }
})