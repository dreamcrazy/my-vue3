<template>
    <div>
        <img src="@/assets/狗头.jpg" alt="" srcset="">
        <button @click="handleClick">马赛克</button>
        <canvas></canvas>
    </div>
</template>

<script setup>
import dog from '@/assets/狗头.jpg'

const handleClick = () => {
    let canvas = document.querySelector("canvas")
    let ctx = canvas.getContext("2d")
    console.log(ctx, dog);

    const img = new Image()
    img.src = dog
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        //获取整张图片的图像数据
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // 定义马赛克方格大小（越大越模糊）
        const suquareSize = 10;
        let data = imageData.data;
        //首先根据宽高遍历整个图片获取到对应的方格
        for (let i = 0; i < canvas.height; i += suquareSize) {
            for (let j = 0; j < canvas.width; j += suquareSize) {
                let totalR = 0;
                let totalG = 0;
                let totalB = 0;
                let totalA = 0;
                let count = 0;
                //遍历当前方格的每个像素将其RGBA值累加起来
                for (let y = i; y < i + suquareSize && y < canvas.height; y++) {
                    for (let x = j; x < j + suquareSize && x < canvas.width; x++) {
                        //y * canvas.width + x就能计算出当前像素在整个图片中的索引
                        //再乘以4是因为imageData.data每个像素用4个值表示
                        //pixelIndex就是当前像素在imageData.data的起始索引也就是它的R值
                        let pixelIndex = (y * canvas.width + x) * 4;
                        totalR += data[pixelIndex];
                        totalG += data[pixelIndex + 1];
                        totalB += data[pixelIndex + 2];
                        totalA += data[pixelIndex + 3];
                        count++;
                    }
                }
                let avgR = totalR / count;
                let avgG = totalG / count;
                let avgB = totalB / count;
                let avgA = totalA / count;
                // 遍历的逻辑与上面一模一样，这一步是将方格内的每个像素的RGBA值替换为平均值
                for (let y = i; y < i + suquareSize && y < canvas.height; y++) {
                    for (let x = j; x < j + suquareSize && x < canvas.width; x++) {
                        let pixelIndex = (y * canvas.width + x) * 4;
                        data[pixelIndex] = avgR;
                        data[pixelIndex + 1] = avgG;
                        data[pixelIndex + 2] = avgB;
                        data[pixelIndex + 3] = avgA;
                    }
                }
            }
        }
        ctx.putImageData(imageData, 0, 0)

    }

}

</script>

<style lang="scss" scoped>
canvas {
    width: 270px;
    height: 270px;
}
</style>