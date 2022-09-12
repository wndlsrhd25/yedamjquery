let template = `<div id="myDIV" class="header">
                  <h2>My To Do List</h2>
                    <input type="text" v-model="title" placeholder="Title...">
                    <span v-on:click="addItem" class="addBtn">Add</span>
                </div>
                `;
export default {
  template,
  data: function () {
    return {
      title: "",
    };
  },
  methods: {
    addItem: function () {
      //삽입
      const component = this;
      $.ajax({
        url: "http://localhost:8088/java/todo",
        type: "post",
        data: {
          id: "4555",
          contents: component.title,
        },
        dataType: "json",
        success: function (data) {
          if (data != null) {
            alert("TodoList add!!");

            //새로고침
            component.$router.go(0);
          }
        },
        error: function (reject) {
          console.log(reject);
        },
      });
    },
  },
};
