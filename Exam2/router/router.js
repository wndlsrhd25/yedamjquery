import selectItems from '../components/selectItems.js';

export default new VueRouter({
  //히스토리 모드가 아니라 해쉬모드로 해야함
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: selectItems,
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
});