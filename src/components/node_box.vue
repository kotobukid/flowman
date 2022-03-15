<template lang="pug">
    g.node
        rect.frame(x="0" y="0" width="200" height="40")
        text.text(v-text="text" x="100" y="28")
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class NodeBox extends Vue {
    @Prop() private text!: string;
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