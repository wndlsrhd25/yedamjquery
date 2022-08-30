//todoList 목록
let template = `<div>
                  <ul id="myUL">
                    <template v-for="item in itemList">
                      <li v-bind:key="item.no"
                          v-bind:class="{ checked : item.todoyn ==1 }"
                          v-on:click="checkedItem(item)">
                          {{ item.contents }}
                          <span class="close"
                                v-on:click.stop="deleteItem(item.no)">x</span>
                      </li>
                    </template>
                  </ul>
                </div>`;
export default {
  template,
  data: function () {
    return {
      items : [],
      //수정시 필요한 정보
      updateItem: {
        content : ''
      },
    }
  },
  computed: {
    itemList: function () {
      return this.items;
    }
  },
  watch: {
    updateItem: function () {
      
    }
  },
  methods: {
    loadData: function () {
      
    },
    checkedItem: function (item) {
      const component = this;
      if (item.todoyn == 1) {
        item.todoyn = 0;
      } else {
        item.todoyn = 1;
      }

      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoUpdate',
        type: 'get',
        data: {
          id: 4555,
          no: item.no,
          todoyn : item.todoyn },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data != null) {
            alert("수정이 완료되었습니다.");
            component.$router.go(0);
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      });
    },
    deleteItem: function (no) {
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoDelete',
        type: 'get',
        data: {
          id: 4555,
          no : no },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data != null) {
            alert('삭제가 완료되었습니다.')
            component.$router.go(0);
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      });
      
    }
  },
  created: function () {
    //데이터를 받을거임
    const component = this;
    $.ajax({
      url: 'http://192.168.0.83:8088/myserver/todoSelect',
      type: 'get',
      data: { id : 4555 },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data != null) {
          component.items = data;
        }
      },
      error: function (reject) {
        console.log(reject);
      }
    })

  }
}