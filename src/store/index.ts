import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

declare type Node = {
    text: string,
    x: number,
    y: number,
    id: number
}

export default new Vuex.Store({
    state: {
        nodes: [
            {
                id: 1,
                x: 10,
                y: 10,
                text: 'こんにちは'
            },
            {
                id: 2,
                x: 410,
                y: 10,
                text: 'こんばんは'
            },
        ] as Node[]
    },
    getters: {
        nodes(state) {
            return state.nodes;
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})
