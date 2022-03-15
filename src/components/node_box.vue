<template lang="pug">
    g.node(:style="transform")
        rect.frame(x="0" y="0" :width="computed_width" :height="computed_height")
        text.text(v-text="node.text" :x="computed_width / 2" :y="(computed_height + 16) / 2")
        circle.resize_start(r="5" :cx="computed_width" :cy="computed_height" @pointerdown="resizing = true")
        rect.event_catcher(x="-10000" y="-10000" width="22000" height="22000" v-if="resizing"
            @mousemove="mouse_move"
            @mouseup="mouse_up"
        )
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

    resize_x: number = 0;
    resize_y: number = 0;

    get computed_width(): number {
        return this.node.width + this.resize_x;
    }

    get computed_height(): number {
        return this.node.height + this.resize_y;
    }

    mouse_move(e: MouseEvent): void {
        this.resize_x += e.movementX;
        this.resize_y += e.movementY;
    }

    mouse_up(): void {
        this.commit_resize();
        this.resizing = false;
        this.resize_x = 0;
        this.resize_y = 0;
    }

    commit_resize() {
        this.$store.commit('node-resize', {
            id: this.node.id,
            width: this.computed_width,
            height: this.computed_height
        });
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
    opacity: 0.1
}
</style>