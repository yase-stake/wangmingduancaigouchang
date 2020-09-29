import { getFxGoods,getTotal,Login } from "@/request/goods";

import { Message } from "element-ui"
import router from "@/router"
//数据持久化  保存的是渲染的数据

export default {
  namespaced: true,
  state: {
    goodslist:[],
    page: 1,
    size: 10,//每页显示的个数 ,
    total:0,//总条数 

   

  

  },
  getters: {
    goodslist: state => state.goodslist,
    page: state => state.page,
    size: state => state.size,
    total:state => state.total,//总条数
   
    
   

  },
  mutations: {
    SET_LIST(state, data) {
      state.goodslist = data
    },
    SET_PAGE(state, data) {
      state.page=data
    },
    SET_SIZE(state, data) {
      state.size=data
    },
    SET_TOTAL(state, data) {
      state.total=data
    },
 
 
  },
  
  actions: {
    async get_goods_list({ commit, state,dispatch }) {
      let res = await getFxGoods(state.page, state.size)
     res.forEach(val => {
       val.specsattr=val.specsattr?val.specsattr.split(","):[]
     });
      console.log(res)
      commit('SET_LIST', res)
      dispatch('get_goods_total')
    },
    async get_goods_total({ commit }) {
      let res = await getTotal()
      commit('SET_TOTAL',res)
    },
    set_page({ commit, dispatch }, data) {
      commit('SET_PAGE', data)
      dispatch('get_goods_total')
    },
    set_size({ commit, dispatch }, data) { 
      commit('SET_SIZE', data)
      dispatch('get_goods_total')
    },
  }
};