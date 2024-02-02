<template>
  <div class="container">
    <div class="sec-con">
      <div class="sec-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="出院" name="住院">
            <template #label>
              <span class="custom-label">出院</span>
            </template>
            <div class="item-content">
              <div class="title-box">
                <h2 class="title">{{ title }}</h2>
                <div class="export" @click="downFile">导出</div>
              </div>
              <Tables :tableData="cyTableData" :tableHeader="cyTableHeader"></Tables>
            </div>
          </el-tab-pane>
          <el-tab-pane label="转科" name="转科">
            <template #label>
              <span class="custom-label">转科</span>
            </template>
            <div class="item-content">
              <div class="title-box">
                <h2 class="title">{{ title }}</h2>
                <div class="export" @click="downFile">导出</div>
              </div>
              <Tables :tableData="zkTableData" :tableHeader="zkTableHeader"></Tables>
            </div>
          </el-tab-pane>
        </el-tabs>
        <p class="tips">注：应评患者为年龄14岁以上且入院无VTE相关诊断的患者</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { onMounted, reactive, ref, toRefs, watch } from 'vue'
  import Tables from './tables.vue'
  import api from '../../../request/api'
  import { proxyBase } from '../../../request/config'
import axios from 'axios'

  const store = useStore()

  const activeName = ref('住院')
  const title = ref('')

  const setTitle = () => {
    const { startTime, endTime } = store.state.searchData
    if (startTime && endTime) {
      title.value = `${startTime} ~ ${endTime} ${activeName.value}患者VTE主要指标统计报表`
    }
  }
  //导出
  // eslint-disable-next-line no-unused-vars
  const downFile1 = () => {
    const { deptCode, startTime, endTime, sj_type, tj_type } = store.state.searchData
    let urlParams = `deptCode=${deptCode}&startTime=${startTime}&endTime=${endTime}&sj_type=${sj_type}&tj_type=${tj_type}`
    let url = ''
    if (activeName.value == '住院') {
      url = proxyBase + '/vteScreenHistoryNew/exportDataReport?' + urlParams;
    } else {
      url = proxyBase + '/vteScreenHistoryNew/exportDataReportByZR?' + urlParams;
    }
    // a标签点击下载
    // let a = document.createElement("a")
    // a.href = url
    // console.log(a);
    // a.click()

    // oepn 和 location.href 同理 不能下载.html文件
    // window.open(url, '_blank')
    
    // xhr下载
    // let xhr = new XMLHttpRequest()
    // xhr.open('GET',url)
    // xhr.send()
    // xhr.onload = function(res) {
    //   console.log(res);
    //   console.log(xhr);
    //   const blod = new Blob([xhr.response],{
    //     type:'text/html'
    //   })
    //   const url = URL.createObjectURL(blod)
    //   let a = document.createElement("a")
    //   a.href = url
    //   a.download = '图表.csv'
    //   console.log(url);
    //   a.click()
    // }


    let data = {
        method:'GET',
        url,
        // responseType: 'arraybuffer'
      }
    axios(data).then(res => {
        console.log(res);
      const blod = new Blob([res.data],{
        type:res.headers['content-type']
      })
      const url = URL.createObjectURL(blod)
      let a = document.createElement("a")
      a.href = url
      a.download = '图表.csv'
      console.log(url);
      a.click()
    })

    // window.location.href = url
  }
  // //导出
  const downFile = () => {
    const { deptCode, startTime, endTime, sj_type, tj_type } = store.state.searchData
    let urlParams = `deptCode=${deptCode}&startTime=${startTime}&endTime=${endTime}&sj_type=${sj_type}&tj_type=${tj_type}`
    let url = ''
    if (activeName.value == '住院') {
      url = proxyBase + '/vteScreenHistoryNew/exportDataReport?' + urlParams;
    } else {
      url = proxyBase + '/vteScreenHistoryNew/exportDataReportByZR?' + urlParams;
    }
    window.location.href = url
  }
  onMounted(() => {
    setTitle()
  })

  const cyTableHeader = {
    deptName: '出院科室',
    cyNum: '出院患者（人次）',
    ypnum: '应评患者（人次）',
    pgNum: '评估患者（人次）',
    pgRate: '评估率（%）',
    jspgNum: '入院24小时内评估患者(人次)',
    jspgRate: '入院及时评估率(%)',
  }
  const zkTableHeader = {
    deptName: '转入科室',
    cyNum: '出院患者（人次）',
    ypnum: '应评患者（人次）',
    pgNum: '评估患者（人次）',
    pgRate: '评估率（%）',
    jspgNum: '转科6小时内评估患者(人次)',
    jspgRate: '转科及时评估率(%)',
  }

  const state = reactive({
    cyTableData: [],
    zkTableData: []
  })

  const { cyTableData, zkTableData } = toRefs(state)

  //出院
  const getDataReport = data => {
    api.statisticsTables.getDataReport(data).then(res => {
      const { data, code } = res;
      if (code == 200 && data) {
        state.cyTableData = data.map(item => {
          return {
            deptName: item.deptName,
            cyNum: item.cyNum,
            ypnum: item.ypnum,
            pgNum: item.pgNum,
            pgRate: item.pgRate,
            jspgNum: item.jspgNum,
            jspgRate: item.jspgRate,
          }
        })
      }
    })
  }
  // 转科
  const getDataReportByZR = data => {
    api.statisticsTables.getDataReportByZR(data).then(res => {
      const { data, code } = res;
      if (code == 200 && data) {
        state.zkTableData = data.map(item => {
          return {
            deptName: item.deptName,
            cyNum: item.cyNum,
            ypnum: item.ypnum,
            pgNum: item.pgNum,
            pgRate: item.pgRate,
            jspgNum: item.jspgNum,
            jspgRate: item.jspgRate,
          }
        })
      }
    })
  }

  watch(() => store.state.searchData, (newVal) => {
    if (newVal) {
      setTitle()
      if (activeName.value == '转科') {
        getDataReportByZR(store.state.searchData)
      } else {
        getDataReport(store.state.searchData)
      }
    }
  }, {
    deep: true,
    immediate: true
  })

  const handleClick = (tab) => {
    const name = tab.paneName
    setTitle()
    if (name == '转科') {
      getDataReportByZR(store.state.searchData)
    } else {
      getDataReport(store.state.searchData)
    }
  }
</script>

<style lang="scss" scoped>
.container {
  .sec-con {
    padding: 0 20px;
    min-height: calc(100vh - 135px);
    .custom-label {
      padding: 0 10px;
    }
    .item-content {
      padding-bottom: 20px;
      .title-box {
        padding: 20px;
        text-align: center;
        position: relative;
        .title {
          font-weight: bold;
          font-size: 16px;
        }
        .export {
          position: absolute;
          right: 20px;
          background: url("~@/assets/imgs/export.png") no-repeat left center;
          padding-left: 28px;
          height: 30px;
          line-height: 30px;
          margin-top: 6px;
          cursor: pointer;
          top: 10px;
        }
      }
    }
    .tips {
      line-height: 1.5;
      padding: 5px 2px;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>