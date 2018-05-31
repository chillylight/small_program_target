// pages/itemDetail/itemDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todolist:[],
    id:'',
    msg:null,
    name:'',
    points:'',
    detail:'',
    isdelete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let todolist=  wx.getStorageSync('todolist');
    let id = options.id;
    let name,points,detail,which_one;
    let i = this.whichOne(id);
    which_one = todolist[i];
    name = todolist[i].name;
    points = todolist[i].points;
    detail = todolist[i].detail;
    this.setData({
      todolist:todolist,
      id:id,
      msg:which_one,
      name:name,
      points:points,
      detail:detail
    })

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

  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },

  points:function(e){
    var value = e.detail.value;
    var to_num = value.replace(/[^0-9]/ig,"");
    this.setData({
      points:to_num
    })
    return to_num;
  },

  details:function(e){
    this.setData({
      detail:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let id = this.data.id;
    let name,points,detail;
    let todolist = this.data.todolist;

    let i = this.whichOne(id);
    name = "todolist["+i+"].name";
    points = "todolist["+i+"].points";
    detail = "todolist["+i+"].detail";
    if (!this.data.isdelete) {
      this.setData({
        [name]:this.data.name,
        [points]:this.data.points,
        [detail]:this.data.detail
      })
    }else{
      return;
    }
    
    wx.setStorageSync('todolist', this.data.todolist);
  },

  delete:function(){
    let id = this.data.id;
    let todolist = this.data.todolist;
    let i = this.whichOne(id);

    this.setData({
      isdelete:true
    })
    todolist.splice(i,1);

    wx.setStorageSync('todolist', this.data.todolist);
    wx.navigateBack()
  }

})