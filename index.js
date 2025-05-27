
Page({
  data: {
    relationshipOptions: ['情侣', '朋友', '同事', '家人'],
    styleOptions: ['嘴硬式', '体面派', '搞笑流', '服软派'],
    relationshipIndex: 0,
    styleIndex: 0,
    scenario: '',
    nickname: '',
    result: ''
  },

  onRelationshipChange(e) {
    this.setData({ relationshipIndex: e.detail.value });
  },

  onStyleChange(e) {
    this.setData({ styleIndex: e.detail.value });
  },

  onScenarioInput(e) {
    this.setData({ scenario: e.detail.value });
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  async generateApology() {
    const { relationshipOptions, relationshipIndex, styleOptions, styleIndex, scenario, nickname } = this.data;
    const prompt = `你和你的${relationshipOptions[relationshipIndex]}发生了一点小摩擦：${scenario}。请用${styleOptions[styleIndex]}的风格生成一段道歉语，称呼对方为「${nickname || '对方'}」。`;

    const res = await wx.request({
      url: 'https://your-server.com/api/generate-apology',
      method: 'POST',
      data: { prompt },
      success: (res) => {
        this.setData({ result: res.data.text });
      },
      fail: () => {
        this.setData({ result: '生成失败，请稍后重试。' });
      }
    });
  }
});
