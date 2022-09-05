let template = `<div id="myDIV" class="header">
                  <h2>My To Do List</h2>
                    <input type="text" v-model="title" placeholder="Title...">
                    <span v-on:click="addItem" class="addBtn">Add</span>
                </div>`;
export default {
  template,
  data: function () {
    return {
      title : ''
    }
  },
  methods: {
    addItem: function () {
      const component = this;
      $.ajax({
        url: 'http://192.168.0.83:8088/myserver/todoInsert',
        data: {
          id: 0,
          contents: component.title
        },
        datatype: 'json',
        success: function (data) {
          if (data != null) {
            alert("TodoList all!!");
            //현재시점의 기록을 가지고 뒤나 앞으로 가는것 (0)이 현재페이지라서 새로고침 처럼 사용함
            component.$router.go(0);
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    }
  }
}
