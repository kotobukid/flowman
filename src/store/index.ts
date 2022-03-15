import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';

Vue.use(Vuex)

declare type Node = {
    text: string,
    x: number,
    y: number,
    id: number,
    width: number,
    height: number
}

declare type NodeWithIndex = Node & {
    index: number
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
        nodes(state): NodeWithIndex[] {
            // @ts-ignore
            return _.map(state.nodes, (n: Node, index: number) => {
                // @ts-ignore
                n.index = index;
                return n;
            });
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
        },
        'node-move'(state, info: { id: number, x: number, y: number }): void {
            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === info.id) {
                    state.nodes[i].x = info.x;
                    state.nodes[i].y = info.y;
                    break;
                }
            }
            state.nodes = [...state.nodes];
        },
        'move-to-top'(state, index: number): void {
            const target: Node = state.nodes.splice(index, 1)[0];
            state.nodes = [...state.nodes, target];
        }
    },
    actions: {},
    modules: {}
})
