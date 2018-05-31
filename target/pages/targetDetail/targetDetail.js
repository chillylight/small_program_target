Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetList: [],
    id: '',
    msg: null,
    name: '',
    points: '',
    detail: '',
    isdelete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let targetList = wx.getStorageSync('targetList');
    let id = options.id;
    let name, points, detail, which_one;
    let i = this.whichOne(id);
    which_one = targetList[i];
    name = targetList[i].name;
    points = targetList[i].points;
    detail = targetList[i].detail;
    this.setData({
      targetList: targetList,
      id: id,
      msg: which_one,
      name: name,
      points: points,
      detail: detail
    })

  },

  whichOne: function (id) {
    // 获取点击的数组是第几个
    let targetList = wx.getStorageSync('targetList');

    for (let i = 0; i < targetList.length; i++) {
      if (targetList[i].id == id) {
        return i;
      }
    }
  },

  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  points: function (e) {
    var value = e.detail.value;
    var to_num = value.replace(/[^0-9]/ig, "");
    this.setData({
      points: to_num
    })
    return to_num;
  },

  details: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let id = this.data.id;
    let name, points, detail;
    let targetList = this.data.targetList;

    let i = this.whichOne(id);
    name = "targetList[" + i + "].name";
    points = "targetList[" + i + "].points";
    detail = "targetList[" + i + "].detail";
    if (!this.data.isdelete) {
      this.setData({
        [name]: this.data.name,
        [points]: this.data.points,
        [detail]: this.data.detail
      })
    } else {
      return;
    }

    wx.setStorageSync('targetList', this.data.targetList);
  },

  delete: function () {
    let id = this.data.id;
    let targetList = this.data.targetList;
    let i = this.whichOne(id);

    this.setData({
      isdelete: true
    })
    targetList.splice(i, 1);

    wx.setStorageSync('targetList', this.data.targetList);
    wx.navigateBack()
  }

})