<template>
    <div>
        <p>name: {{ name }}</p>
        <button @click="clipboard">点击复制</button>
    </div>
</template>

<script>
import { toRef } from "vue";
export default {
    props: ['number'],
    setup(props, ctx) {
        let newNumber = toRef(props, "number")
        console.log(newNumber);
        console.log(props.number);
        console.log(ctx);

        const clipboard = () => {
            navigator.clipboard.writeText('asdasd').then(() => {
                console.log(123)
            }).catch(() => {
                console.log(456);
            })
        }
        return {
            name: 1,
            clipboard
        }
    }
}
</script>

<style lang="scss" scoped></style>