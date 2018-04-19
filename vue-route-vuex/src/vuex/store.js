import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    count:1,
    allCount:0
}

const mutations = {
  add(state,num){
    state.count+=num;
    // state.count++;
  },
  reduce(state,num){
    state.count-= num;
    // state.count--;
  }
}

const getters = {
  count(state){
    console.log(111111)
    return state.count += 100;
  }
}

// actions 可以直接使用 mutations的方法
const actions = {
  addActions(context){
    context.commit('add',10);
  },
  reduceActions({commit}){
    commit('reduce',5)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})