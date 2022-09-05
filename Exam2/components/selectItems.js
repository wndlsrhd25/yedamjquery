//todoList 목록
let template = `<div>
                  <ul id="myUL">
                    <template v-for="item in itemList">
                      <li v-bind:key="item.no"
                          v-bind:class="{ checked : item.yn }"
                          v-on:click="checkedItem(item.no)">
                          {{ item.contents }}
                          <span class="close"
                                v-on:click.self.stop="deleteItem(item.no)">x</span>
                      </li>
                    </template>
                  </ul>
                </div>`;

export default {
  template,
  data: function () {
    return {
      items: [], //서버에서 가져오는 원본데이터
      updateItem: {}
    }
      
  },
  //새로운 프로퍼티를 만듦 -> 다른곳에서 재사용을 하기 위해서
  computed: {
    itemList: function () {
      return $.map(this.items, function (item) {
        item.yn = item.todoyn == 1 ? true : false;
        return item;
      })
    }
  },
  watch: {
    updateItem: function () {
      //체크아이템 메소드 안에서만 변경이 되고 있음
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoUpdate',
        data: component.updateItem,
        dataType: 'json',
        success: function (data) {
          if (data != null) {
            alert("todoList update!");
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    }
  },
  //다른곳에서 재사용 하려고
  created: function () {
    this.loadData();
  },
  methods: {
    loadData: function () {
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoSelect',
        data: { id: 0 },
        dataType: 'json',
        success: function (data) {
          component.items = data;
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    },
    checkedItem: function (no) {
      const component = this;
      $(this.items).each(function (item) {
        if (item.no == no) {
          item.todoyn = item.todoyn = 1 ? 0 : 1;
          component.updateItem = item;
        }
      })
    },
    deleteItem: function (no) {
      const component = this;
        $.ajax({
          url: 'http://192.168.0.83:8088/myserver/todoDelete',
          data: { id: 0, no: no },
          dataType: 'json',
          success: function (data) {
            if (data != null) {
              alert("todoList Delete");
              component.items = $.grep(component.items, function (item) {
                return (item.no == no);
              })
            }
          },
          error: function (reject) {
            console.log(reject);
          }
        })
    }
  }
}