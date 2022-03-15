import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

declare type Node = {
    text: string,
    x: number,
    y: number,
    id: number,
    width: number,
    height: number
}

export default new Vuex.Store({
    state: {
        nodes: [
            {
                id: 1,
                x: 10,
                y: 10,
                text: 'こんにちは',
                width: 200,
                height: 40
            },
            {
                id: 2,
                x: 410,
                y: 10,
                text: 'こんばんは',
                width: 250,
                height: 50
            },
        ] as Node[]
    },
    getters: {
        nodes(state) {
            return state.nodes;
        }
    },
    mutations: {
        'node-resize'(state, info: { id: number, width: number, height: number }): void {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === info.id) {
                    state.nodes[i].width = info.width;
                    state.nodes[i].height = info.height;
                    break;
                }
            }
            state.nodes = [...state.nodes];
        }
    },
    actions: {},
    modules: {}
})
