<template lang="pug">
    svg(width="1000" height="600" viewBox="0 0 1000 600")
        node-box(v-for="n in nodes" :node="n")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import NodeBox from "@/components/node_box.vue";

@Component({
    components: {
        'node-box': NodeBox
    }
})
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;

    get nodes () {
        return this.$store.getters['nodes'];
    }
}
</script>

<style scoped lang="less">
svg {
    border: 1px solid grey;
    background-color: #efefef;
}
</style>
