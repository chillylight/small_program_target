//index.js
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    allScore:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getScore();
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getScore:function(){
    let todoList = wx.getStorageSync('todolist');
    let targetList = wx.getStorageSync('targetList');
    let add_score = 0;
    let src_score = 0;
    let all_score = 0;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].checked == true) {
        add_score += Number(todoList[i].points);
      }
    }
    for (let i = 0; i < targetList.length; i++){
      if (targetList[i].checked == true){
        src_score += Number(targetList[i].points);
      }
    }
    all_score = add_score - src_score;

    this.setData({
      allScore:all_score
    })
  }
})
