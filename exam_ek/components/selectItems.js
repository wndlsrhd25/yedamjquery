let template = `
<div>
  <ul id="myUL">
    <template v-for="item in items">
      <li :key="item.no" :class="{ checked : item.todoyn === '1' ? true : false }" @click="todoUpdate(item)">
        {{ item.contents }}
        <span class="close" @click.stop="todoDelete(item)">x</span>
      </li>
    </template>
  </ul>
</div>`;

export default {
  template,
  data : function(){
    return {
      id : 70,
      items : [],
      updateItem : {}
    }
  },
  created : function(){
    const component = this;
    $.ajax({
      url : 'http://localhost:8088/java/todo',
      data : { id : component.id },
      dataType : 'json',
      success : function(data){
        if(data != null){
          component.items = data;
        }
      },
      error : function(reject){
        console.log(reject);
      }
    })
  },
  methods : {
    todoUpdate : function(info){
      const component = this;
      this.updateItem = info;

      $.ajax({
        url: 'http://localhost:8088/java/todo',
        type: "put",
        contentType : "application/json",
        data : JSON.stringify({
          id : component.id,
          no : component.updateItem.no,
          todoyn : component.updateItem.todoyn == '1' ? '0' : '1'
        }),
        dataType : 'json',
        success : function(data){
          if(data != null){
            component.updateItem.todoyn = component.updateItem.todoyn == '1' ? '0' : '1';
          }
        },
        error : function(reject){
          console.log(reject);
        }
      })
    },
    todoDelete : function(info){

      const component = this;
      this.updateItem = info;

      $.ajax({
        url : 'http://localhost:8088/java/todo'+no,
        data : {
          id : component.id,
          no : component.updateItem.no
        },
        dataType : 'json',
        success : function(data){
          if(data != null){
            for(let i=0; i<component.items.length; i++) {
              if (component.items[i].no == component.updateItem.no){
                component.items.splice(i, 1);
              }
            }
          }
        },
        error : function(reject){
          console.log(reject);
        }
      })
    }
  }
}