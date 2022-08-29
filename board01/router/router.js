//router은 다른페이지를 보여주고 싶을때 사용함
//뷰로 만든 페이지 간에 자유롭게 이동이 가능하게 하는 라이브러리
//  Vue Router
//   1. vue.js에서 페이지 간 이동을 위한 라이브러리 (vue.js 공식 라우터)
//   2. 페이지 이동할 때 url 변경되면, 변경된 요소의 영역에 컴포넌트를 갱신
import main from '../components/main.js';
import myBoardList from '../components/myBoardList.js';
import myBoardRead from '../components/myBoardRead.js';
import myBoardWrite from '../components/myBoardWrite.js';

export default new VueRouter({
  mode : "history", // default : hash -> '#'/path
  routes : [
    //main
    {
      path : '/',
      name : 'main',
      component : main,
      props : true
    },
    //boardList
    {
      path : '/boardList',
      name : 'boardList',
      component : myBoardList,
      props : true
    },
    //boardRead
    {
      path : '/boardRead/:data',
      name : 'boardRead',
      component : myBoardRead,
      props : true
    },
    //boardWrite
    {
      path : '/boardWrite',
      name : 'boardWrite',
      component: myBoardWrite,
      props : true
    },
    {
      path : '*',
      redirect : '/'
    }
  ]
})