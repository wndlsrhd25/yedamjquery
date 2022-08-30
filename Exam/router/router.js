import selectItems from '../components/selectItems.js';

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'selectItems',
      component: selectItems,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    },
  ],
});