export default {
  template: `<div>
              <table id="list">
                <tr>
                  <th style="width:50px;">글번호</th>
                  <th>글제목</th>
                  <th style="width:50px;">조회수</th>
                  <th style="width:70px;"></th>
                </tr>
                <tr v-for="item in object" v-bind:key="item.no">
                  <td>{{ item.no }}</td>
                  <!-- <td v-on:click="boardRead(item)">{{ item.title }}</td> -->
                  <router-link tag="td" v-bind:to="{ name  : 'boardRead', params : { data : item }}">{{ item.title }}</router-link>

                  <td>{{ item.view }}</td>
                  <td><button v-on:click="boardDelete(item.no)">삭제</button></td>
                </tr>
              </table>
              <!-- <button style="float:right;" v-on:click="boardWrite">글쓰기</button> -->
              <router-link tag="button"
                            style="float:right;"
                            v-bind:to="{name : 'boardWrite'}">글쓰기</router-link>
            </div>`,
  data: function () {
    return {
      object: []
    }
  },
  created: function () {
    //서버에서 데이터를 가져오는 경우
    //this.$parent =>vue
    this.object = this.$parent.getParentData();
    // -> this.object = this.dataArray['board']
  },
  methods: {
    boardDelete: function (no) {
      for (let i = 0; i < this.object.length; i++) {
        if (this.object[i].no == no) {
          this.object.splice(i, 1);
        }
      }
      //반드시 필요, 밑에 단계는 타입이 참조타입일 경우 사실상 생략가능
      this.$parent.setParentData(this.object);
    }
    

  }
}