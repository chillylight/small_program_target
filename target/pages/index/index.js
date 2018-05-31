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
    todolist:[],
    id:1,
    checked:false
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '每天一个小目标，慢慢实现大梦想',
      path: '/pages/index'
    }
  },
  onShow: function () {
    this.showList()
  },
  showList:function(){
    // 渲染任务列表
    let todolist=  wx.getStorageSync('todolist')
    if (todolist) {
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
        todolist:todolist
      })
    }else{
      this.setData({
        isShowDevide:false
      })
      console.log(this.data.todolist)
    }
  },
  countUnChecked:function(){
    let todolist = wx.getStorageSync('todolist');
    let count = 0;
    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].checked == false) {
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
    let is_data = wx.getStorageSync('todolist');
    let id;

    if (is_data == '') {
      that.setData({
        id:1  
      })
    }else{
      id = wx.getStorageSync('todolist')[0].id;
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
    let checked = "todolist["+i+"].checked";
    let ischeck = e.currentTarget.dataset.checked;
    let points = e.currentTarget.dataset.points;
    if (points == '') {
      points = "完成任务";
    }else{
      points = '完成任务 +'+points+'分';
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
    wx.setStorageSync('todolist', this.data.todolist);
  },

  cancelCheck:function(e){
    let id = e.currentTarget.dataset.id;
    let i = this.whichOne(id);
    let checked = "todolist["+i+"].checked";
    let ischeck = e.currentTarget.dataset.checked;
    let points = e.currentTarget.dataset.points;
    if (points == '') {
      points = "取消任务";
    }else{
      points = '取消任务 -'+points+'分';
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
    wx.setStorageSync('todolist', this.data.todolist);
  },

  whichOne:function(id){
    // 获取点击的数组是第几个
    let todolist=  wx.getStorageSync('todolist');

    for (let i = 0; i < todolist.length; i++) {
      if (todolist[i].id == id) {
        return i;
      }
    }
  },
  submitTodo:function(){
    // 点击提交时执行的操作
    let doDetail = this.data.todoValue;
    let id = this.data.id;
    let todolist = this.data.todolist;

    let msg = {
      "id":id,
      "name":doDetail,
      "checked":false,
      "points":'',
      "cycle":'',
      "detail":''
    };
    
    todolist.unshift(msg);
    wx.setStorageSync('todolist', todolist);

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
      url: '../itemDetail/itemDetail?id=' + id
    })
  },
  viewTap:function(){
    this.setData({
      isShowAdd: false
    })
  }
})