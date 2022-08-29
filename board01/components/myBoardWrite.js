export default {
      template : `<div>
                    <table id="list">
                      <tr>
                        <td>글제목</td>
                        <td><input type="text" style="width:90%" v-model="title"></td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <textarea style="width:100%" v-model="content"></textarea>
                        </td>
                      </tr>
                    </table>
                    <!-- 목록은 페이지 전환이 필요해서 라우터가 필요함 -->
                    <!-- <button style="float:right;" v-on:click="boardList">목록</button> -->
                    <router-link tag="button" style="float:right;" v-bind:to="{ name : 'boardList' }">목록</router-link>
                    <button style="float:right;" v-on:click="boardSave">저장</button> 
                    </div>`,
      data : function(){
        return {
          title : '',
          content : ''
        }
      },
      
  methods: {  
        boardSave: function (title, content) {
          let dataArray = this.$parent.getParentData(); //this.$parent.dataArray
          //글 저장
            let no = 1;
            if(dataArray.length !=0){
              //맨 마지막 번호를 가져옴
              let index = dataArray.length-1;
              //거기서 +1을 하면 다음 번호가 됨
              no = parseInt(dataArray[index].no)+1;
          }
          
            let board_info = {
              no : no,
              title: this.title,
              content: this.content,
              view: '0'
            }

          dataArray.push(board_info);
          
          this.$parent.setParentData(dataArray);
          this.$router.push({ name: 'boardList' });

        },
      },
      
    }