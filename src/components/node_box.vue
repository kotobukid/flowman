<template lang="pug">
    g.node(:style="transform")
        rect.frame(x="0" y="0" width="200" height="40")
        text.text(v-text="node.text" x="100" y="28")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

declare type Node = {
    id: number,
    x: number,
    y: number,
    text: string
}

@Component
export default class NodeBox extends Vue {
    @Prop() private node!: Node;

    get transform(): string {
        return `transform: translate(${this.node.x}px, ${this.node.y}px);`;
    }
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

</style>