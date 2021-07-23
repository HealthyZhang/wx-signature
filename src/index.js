Component({
  properties: {
    canWidth: {
      type: Number,
      value: 0
    },
    canHeight: {
      type: Number,
      value: 0
    },
    placeHolder: {
      type: String,
      value: ''
    },
    bgColor: {
      type: String,
      value: '#FFFFFF'
    }
  },
  data: {
    isBgDraw: false,
    context: null,
    isButtonDown: false,
    lineArr: [],
  },
  ready() {
    const that = this
    const query = this.createSelectorQuery()
    query.selectAll('.zjk-canvas_container').boundingClientRect().exec(function (res) {
      that.data.canWidth = res[0][0].width
      that.data.canHeight = res[0][0].height
    })
    this.data.context = wx.createCanvasContext('zjk-signature', this)
  },
  methods: {
    canvasStart(event) {
      this.data.isButtonDown = true
      this.data.lineArr.push({
        isStart: true,
        x: event.touches[0].x,
        y: event.touches[0].y
      })
      this.data.context.setStrokeStyle('#000000')
      this.data.context.setLineWidth(4)
      this.data.context.setLineCap('round')
      this.data.context.setLineJoin('round')
      if (this.data.isBgDraw) return
      this.data.context.setFillStyle('#FFFFFF')
      this.data.context.fillRect(0, 0, this.data.canWidth, this.data.canHeight)
      this.data.context.draw()
      this.data.isBgDraw = true
    },
    canvasMove(event) {
      if (!this.data.isButtonDown) return
      this.data.lineArr.push({
        isStart: false,
        x: event.touches[0].x,
        y: event.touches[0].y
      })

      this.data.lineArr.forEach(item => {
        if (item.isStart) {
          this.data.context.moveTo(item.x, item.y)
        } else {
          this.data.context.lineTo(item.x, item.y)
        }
      })
      this.data.context.stroke()
      this.data.context.draw(true)
    },
    canvasEnd() {
      this.data.isButtonDown = false
    },
    clearDraw() {
      this.data.lineArr = []
      this.data.context.clearRect(0, 0, this.data.canWidth, this.data.canHeight)
      this.data.context.draw(true)
      this.data.isBgDraw = false
    },
    submit() {
      this.getImg()
    },
    getImg() {
      const that = this
      return new Promise((resolve, reject) => {
        if (that.data.lineArr.length <= 1) {
          wx.showModal({
            title: '提示',
            content: '签名内容不能为空！',
            showCancel: false
          })
          reject()
        } else {
          wx.canvasToTempFilePath({
            canvasId: 'zjk-signature',
            success: result => {
              resolve(result.tempFilePath)
            },
            fail: err => {
              reject(err)
            }
          }, that)
        }
      })
    }
  }
})
