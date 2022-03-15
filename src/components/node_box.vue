<template lang="pug">
    g.node(:style="transform" @pointerenter="move_top")
        rect.frame(x="0" y="0" :width="computed_width" :height="computed_height")
        text.text(v-text="node.text" :x="computed_width / 2" :y="(computed_height + 16) / 2")
        image.move_handle(href="/images/4arrows.svg" width="24" height="24" x="2" y="2"
            @pointerdown="moving = true"
        )
        rect.event_catcher.move(x="-10000" y="-10000" width="22000" height="22000" v-if="moving"
            @mousemove="mouse_move_m"
            @mouseup="mouse_up"
            @mouseleave="mouse_up"
        )
        circle.resize_start(r="5" :cx="computed_width" :cy="computed_height" @pointerdown="resizing = true")
        rect.event_catcher.resize(x="-10000" y="-10000" width="22000" height="22000" v-if="resizing"
            @mousemove="mouse_move"
            @mouseup="mouse_up"
            @mouseleave="mouse_up"
        )
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

declare type NodeWithIndex = {
    id: number,
    x: number,
    y: number,
    text: string,
    width: number,
    height: number,
    index: number
}

@Component
export default class NodeBox extends Vue {
    @Prop() private node!: NodeWithIndex;

    get transform(): string {
        return `transform: translate(${this.computed_x}px, ${this.computed_y}px);`;
    }

    resizing: boolean = false;
    moving: boolean = false;

    resize_x: number = 0;
    resize_y: number = 0;
    move_x: number = 0;
    move_y: number = 0;

    get computed_width(): number {
        return Math.max(200, this.node.width + this.resize_x);
    }

    get computed_height(): number {
        return Math.max(40, this.node.height + this.resize_y);
    }

    get computed_x(): number {
        return Math.max(0, this.node.x + this.move_x);
    }

    get computed_y(): number {
        return Math.max(0, this.node.y + this.move_y);
    }

    mouse_move(e: MouseEvent): void {
        this.resize_x += e.movementX;
        this.resize_y += e.movementY;
    }

    mouse_move_m(e: MouseEvent): void {
        this.move_x += e.movementX;
        this.move_y += e.movementY;
    }

    mouse_up(): void {
        if (this.resizing) {
            this.commit_resize();
        }
        if (this.moving) {
            this.commit_move();
        }
        this.resizing = false;
        this.moving = false;
        this.resize_x = 0;
        this.resize_y = 0;
        this.move_x = 0;
        this.move_y = 0;
    }

    commit_resize() {
        this.$store.commit('node-resize', {
            id: this.node.id,
            width: this.computed_width,
            height: this.computed_height
        });
    }

    commit_move() {
        this.$store.commit('node-move', {
            id: this.node.id,
            x: this.computed_x,
            y: this.computed_y
        });
    }

    move_top(): void {
        this.$store.commit('move-to-top', this.node.index);
    }
}

</script>

<style lang="less" scoped>
rect.frame {
    fill: lightblue;
    stroke: black;
    stroke-width: 1px;

    &:hover {
        fill: #ccfdf7;
    }
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
    opacity: 0;

    &.resize {
        cursor: nwse-resize;
    }

    &.move {
        cursor: move;
    }
}

.move_handle {
    opacity: 0;
    cursor: move;

    .node:hover & {
        opacity: 1;
    }
}
</style>