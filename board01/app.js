// app(최상위) - myHeader
//     - Router - list --> 출력
//              - read
//              - write
import myHeader from './components/myHeader.js';
import router from './router/router.js';
let template = `<div>
                  <!-- my-header를 parentData와 바인딩 하겠다 -> this.$data(내가 가진 모든 데이터)와 하겠다 -->
                  <my-header v-bind:parentData.sync="this.$data"></my-header>
                  <router-view></router-view>
                </div>`;

//sync : 양방향 통신(부모에서 자식에게 데이터를 주고 자식이 부모에게 데이터를 주고 가능)
let app = new Vue({
  el: '#app',
  template: template,
  components: {
    myHeader //myHeader : myHeader 
    
  },
  data : {
    dataArray : {},
  },
  methods : {
    getParentData: function () {
      return this.dataArray['board'];
    },
    setParentData: function (dataArray) {
      this.dataArray['board'] = dataArray;
    }
  },
  router // router : router
})