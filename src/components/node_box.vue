<template lang="pug">
    g.node(:style="transform")
        rect.frame(x="0" y="0" :width="node.width" :height="node.height")
        text.text(v-text="node.text" :x="node.width / 2" :y="(node.height + 16) / 2")
        circle.resize_start(r="5" :cx="node.width" :cy="node.height" @pointerdown="resizing = true")
        rect.event_catcher(x="-10000" y="-10000" width="22000" height="22000" v-if="resizing")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

declare type Node = {
    id: number,
    x: number,
    y: number,
    text: string,
    width: number,
    height: number
}

@Component
export default class NodeBox extends Vue {
    @Prop() private node!: Node;

    get transform(): string {
        return `transform: translate(${this.node.x}px, ${this.node.y}px);`;
    }

    resizing: boolean = false;
}

</script>

<style lang="less" scoped>
rect.frame {
    fill: #ccfdf7;
    stroke: black;
    stroke-width: 1px;
}

.text {
    text-anchor: middle;
    font-size: 1rem;
    line-height: 1rem;
}

.resize_start {
    fill: transparent;
    stroke: grey;
    stroke-width: 1px;

    &:hover {
        fill: lightblue;
        stroke: blue;
        cursor: nwse-resize;
    }
}

.event_catcher {
    fill: purple;
    opacity: 0.3
}
</style>