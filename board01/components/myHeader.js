export default {
  name: 'my-header',
  template: `<div>
              <h2>간단한 게시판</h2>
                <p>게시판 데이터 json 파일 읽기</p>
                <input type="file" v-on:change="loadData($event)">
                <button v-on:click="saveBoardList">게시판 저장하기</button>
            </div>`,
  //외부에서 components로 선언한 것은 props로 받음
  props: ['parentData'],
  methods: {
    loadData: function (event) {
      //json파일과 현재 파일 위치가 차이나기 때문에 '/board01'을 이용해서 절대경로 잡아주기
      let file = '/board01/'+event.target.files[0].name; //등록된 파일명
          
      if (file) {
        //뷰인스턴스 값을 받아와서 아작스로 접근해라
        let vueObj = this;
        //fetch는 호출하는 시점, 배경이 되는 존재에 대해서 호출함
        fetch(file)
          .then(response => response.json()) //json 파싱 단계
          .then(data => { 
            this.parentData.dataArray = data; 

            //.sync -> this.$emit('update:프로퍼티',this.프로퍼티 <-어떤값인지) 
            //sync와 연결된 프로퍼티만 이렇게 사용 가능
            this.$emit('update:parentData', this.parentData);

            //router을 이용해서 push(실행하겠다)
            this.$router.push({ name : 'boardList'});

          }).catch(err => console.log(err));
      }
    },
    saveBoardList : function(){
          //글 파일 저장
          let data = this.parentData.dataArray;

          if(data.length ==0){
            alert("저장할 게시판 내용이 없습니다.");
            return;
          }
      if (typeof data === 'object') {
            //모양은 json이지만 객체인 아이를 모양도 json 내용도 json으로 바꾼다
            data = JSON.stringify(data, undefined, 4);
          }
      let blob = new Blob([data], {
        type: 'text/json'
      });
      let a = document.createElement('a');
          //다운받아 저장할 데이터 이름
          a.download = 'board.json';
          a.href =window.URL.createObjectURL(blob);
          a.click();
        },
  }
}