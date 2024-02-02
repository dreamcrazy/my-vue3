import axios from 'axios'

let arr = [];
const CancelToken = axios.CancelToken;
 axios.get('http://localhost:3000/axios/4',{
    cancelToken: new CancelToken(function executor(c){
        arr.push(c);
        // cancel = c;
    })
  }).then(function(res) {
        console.log(res.data);
      })
  axios.get('http://localhost:3000/axios/3',{
    cancelToken: new CancelToken(function executor(c){
        arr.push(c);
        // cancel = c;
    })
  }).then(function(res) {
        console.log(res.data);
      })
  for (let i = 0; i < arr.length; i++) {
    arr[i]('请求取消');
  }
