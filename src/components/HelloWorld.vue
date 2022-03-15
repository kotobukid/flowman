<template lang="pug">
    svg(width="1000" height="600" viewBox="0 0 1000 600")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
}
</script>

<style scoped lang="less">
svg {
    border: 1px solid grey;
}
</style>
