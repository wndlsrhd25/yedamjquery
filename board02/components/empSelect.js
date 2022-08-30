
//사원정보 목록 조회
let template = `<div>
                  <table id="list">
                    <thead>
                      <th v-for="info in headerInfo">{{ info }}</th>
                    </thead>
                    <tbody>
                      <!-- empList : array of object / empInfo : object -->
                      <!-- router-link 한사람에 대한 정보-->
                      <template v-for="empInfo in currentData">
                      <router-link tag="tr" v-bind:to="{ name : 'empRead', params : { empId : empInfo.employee_id }} ">
                      <td v-for="info in headerInfo">{{ empInfo[info] }}</td>
                      </router-link>
                      </template>
                    </tbody>
                  </table>
                  <!-- 페이지네이션 -->
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <template v-for="page in pagingInfo.totalPage">
                      <li class="page-item">
                        <a class="page-link" href="#" v-on:click.prevent="currentPage = page">{{ page }}</a>
                      </li>
                      </template>
                    </ul>
                  </nav>
                  <router-link tag="button" v-bind:to="{ name : 'empWrite' }">직원등록</router-link>

                </div>`;

export default {
  template: template,
  data: function () {
    return {
      headerInfo : ['employee_id', 'first_name', 'last_name', 'email', 'job_id'],
      empList: [],
      currentPage : 1
    }
  },
  computed: {
    // data 속성을 필요에 따라 연산해서 만드는 또 다른 프로퍼티 -> 읽기전용

    // 페이징관련 데이터 : 한 페이지 당 출력할 데이터 수, 전체 페이지 수
    pagingInfo: function () {
      //한페이지당 10
      let perData = 10;
      //Math.ceil(올림) / empList 서버가 가지고 있는 전체데이터
      let totalPage = Math.ceil(this.empList.length / perData);
      
      return {
        perData: perData,
        totalPage : totalPage
      }
    },

    //사용자가 선택한 현재 페이지에 따라 출력될 데이터
    currentData: function () {
      let firstIndex = (this.currentPage - 1) * this.pagingInfo.perData; //0
      let lastIndex = firstIndex + this.pagingInfo.perData - 1; //9

      return this.empList.filter((empInfo, index) => {
        return index >= firstIndex ? (index <= lastIndex ? true : false) : false;
      })
      
    }

  },
  //페이지를 가져오면서 뿌리려면 created를 써야함
  //view인스턴스가 메모리상에 올라갔을때 실행됨
  created: function () {
    //변수에 인스턴스에 관한 정보를 가져옴
    const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empSelect',
      dataType: 'json',
      success: function (data) {
        if (data != null) {
          component.empList = data;
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    })
  }
}