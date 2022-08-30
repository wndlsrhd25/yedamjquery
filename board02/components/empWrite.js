
//사원 작성 <!-- empWrite -->
let template = `<div>
                  <form id="info" onsubmit="return false">
                    <template v-for="info in infos">
                      <!-- 사원이 가지고 있는 정보 중 하나 -->
                      <div>
                        <label v-bind:for="info">{{ info }}</label>
                        <input type="text" v-bind:id="info" 
                                            v-bind:name="info"
                                            v-model="empInfo[info]">
                      </div>
                    </template>
                  </form>
                  <div>
                    <button v-on:click="updateMode ? updateContent() : uploadContent()">저장</button>
                    <router-link tag="button" v-bind:to="{ name : 'empSelect' }">취소</router-link>
                  </div>
                </div>`

export default {
  template,
  props : ['empId'],
  data: function () {
    return {
      infos: ['employee_id', 'first_name', 'last_name', 'email', 'job_id'],
      //수정 시 필요한 정보
      empInfo: {
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        job_id: ''
      },
      //모드 전환용
      updateMode : false
    }
  },
  created: function() {
    if (this.empId > 0) {
      this.empId = Number(this.empId);

      const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empFind',
      type: 'get',
      data: { employee_id: component.empId },
      dataType : 'json',
      success: function (data) {
        if (data != null) {
          component.empInfo = data;
          component.updateMode = true;
        }
      }, 
      error: function (reject) {
        console.log(reject);
      }
    })
    }
  },
  methods: {
    //직원등록
    uploadContent: function () {
      const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empInsert',
      type :'post',
      data: component.empInfo,
      success: function (data) {
        if (data != null) {
          alert('등록완료');
          component.$router.push({ name : 'empSelect' });
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    })
    },
    //직원 수정
    updateContent: function () {
        const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/empUpdate',
      type :'post',
      data: component.empInfo,
      success: function (data) {
        if (data != null) {
          alert('수정완료');
          component.$router.push({ name : 'empSelect' });
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    })
    }
  }
}