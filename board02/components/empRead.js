//사원정보 상세 조회
let template = `<div>
                  <div>
                    <template v-for="info in infos">
                      <div>
                        <span>{{ info }}</span>
                        <span>{{ empInfo[info] }}</span>
                      </div>
                    </template>
                  </div>
                  <div>
                    <!-- 수정-router -->
                    <router-link tag="button" v-bind:to="{ name: 'empWrite' , params : { empId: empInfo.employee_id }}">수정</router-link>
                    <!-- 삭제는 클릭이벤트 -->
                    <button v-on:click="deleteData">삭제</button>
                  </div>
                </div>`;

export default {
  template,
  props: ['empId'],
  data: function () {
    return {
      empInfo: {},
      infos: ['employee_id', 'first_name', 'last_name', 'email', 'job_id']
    }
  },
  created: function () {
    const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empFind',
      type: 'get',
      data: { employee_id: component.empId },
      dataType: 'json',
      success: function (data) {
        if (data != null) {
          component.empInfo = data;
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    })
  },
  methods: {
    deleteData: function () {
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/empDelete',
        type: 'post',
        data: { employee_id: component.empInfo.employee_id },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data != null) {
            alert('삭제가 완료되었습니다.')
            component.$router.push({ name: 'empSelect' });
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      });
    }
  }
}