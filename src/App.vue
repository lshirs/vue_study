<template>
  <div id="app">
    <vue-esign ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" style="border: chocolate 1px solid" />

    <button @click="handleReset">清空画板</button>

    <button @click="handleGenerate">生成图片</button>

  </div>
</template>

<script>


export default {
  name: 'App',

  data () {
    return {
      lineWidth: 6,
      lineColor: '#564566',
      bgColor: '#E5A1A1',
      resultImg: '',
      isCrop: false
    }
  },
  methods: {
    handleReset () {
      this.$refs['esign'].reset() //清空画布
    },
    handleGenerate () {
      this.$refs['esign'].generate().then(res => {
        this.resultImg = res
        // 得到了签字生成的base64图片
        let fileName ='LSH'+ +new Date()
        this.base64ImgtoFile(res,fileName)

      }).catch(err => { //  没有签名，点击生成图片时调用

        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },
    base64ImgtoFile(dataurl,fileName) {

      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(dataurl.split(',')[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        var blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + 'png')
      } else {
        // 这里就按照chrome等新版浏览器来处理
        const a = document.createElement('a')
        a.href = dataurl
        a.setAttribute('download', fileName)
        a.click()
      }

    },

  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
