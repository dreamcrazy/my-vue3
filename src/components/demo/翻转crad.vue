<template>
  <div class="box">
    <div class="item front" :class="{'show dely5': isFront}">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="item back" :class="{'show dely5': !isFront}">
      <el-form :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-button @click="toggle">toggle</el-button>
  <fzCmp></fzCmp>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import fzCmp from './翻转crad网上demo.vue'

  const isFront = ref(true)
  const toggle = () => {
    isFront.value = !isFront.value
  }
  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  })

  const onSubmit = () => {
    console.log('submit!')
  }
</script>

<style lang="scss" scoped>

$easeBounceStart: cubic-bezier(0.25, -0.24, 0.88, 0.9);
$easeBounceEnd: cubic-bezier(0.11, 0.11, 0.59, 1.3);
.box {
  position: relative;
  width: 380px;
  height: 400px;
  border-radius: 5px;
  background: rgb(95, 135, 151);
  .item {
    position: absolute;
    left: 20px;
    top: 10px;
    width: 300px;
    background-color: antiquewhite;
    border-radius: 5px;
    transition: 0.5s linear;
    box-shadow: 0 0 10px rgba(95, 135, 151,.8);
  }
  .dely5 {
    transition-delay: 0.5s;
  }
  .front {
    z-index: 1;
    transform: rotateY(90deg);
    // transition-timing-function: $easeBounceEnd;
    // transition-delay: 0.5s;
    &.show {
      transform: rotateY(0);
      // transition-delay: 0;
      // transition-timing-function: $easeBounceStart;
    }
  }
  .back {
    background-color: aquamarine;
    transform: rotateY(-90deg);
    // transition-timing-function: $easeBounceStart;
    // transition-delay: 0;
    &.show {
      transform: rotateY(0);
      // transition-delay: 0.5s;
      // transition-timing-function: $easeBounceEnd;
    }
  }
}
</style>