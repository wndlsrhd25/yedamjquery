let template = `
<div id="myDIV" class="header">
  <h2>My To Do List</h2>
  <input type="text" v-model="title" placeholder="Title...">
  <span v-on:click="addItem" class="addBtn">Add</span>
</div>`;

export default {
  template,
  data : function(){
    return {
      title : '',
      id : 70
    }
  },
  methods : {
    addItem : function(){
      const component = this;

      $.ajax({
        url : 'http://localhost:8088/java/todo',
        data : {
          id : component.id,
          contents : component.title
        },
        dataType : 'json',
        success : function(data){
          if(data != null){
            alert('TodoList add!!');
            component.$router.go(0);  // mode : hash
          }
        },
        error : function(reject){
          console.log(reject);
        }
      })
    }
  }
}