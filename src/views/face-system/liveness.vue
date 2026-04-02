<script setup lang="ts">
import { computed, ref } from 'vue';
import { livenessDimensions } from './data';

defineOptions({
  name: 'FaceSystemLiveness',
});

const mode = ref<'blink' | 'multi'>('multi');
const frameCount = ref(8);
const scores = ref([1, 1, 1, 0, 1, 1]);

const passedCount = computed(() => scores.value.filter(Boolean).length);
const resultText = computed(() => {
  if (mode.value === 'blink') {
    return scores.value[0] === 1 && frameCount.value >= 8 ? '活体验证通过' : '活体验证未通过';
  }
  return passedCount.value >= 3 && frameCount.value >= 8 ? '活体验证通过' : '活体验证未通过';
});

function simulateFrame() {
  scores.value = scores.value.map(() => Math.round(Math.random()));
  frameCount.value = 6 + Math.floor(Math.random() * 4);
}

function resetState() {
  scores.value = [0, 0, 0, 0, 0, 0];
  frameCount.value = 0;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="活体检测模块演示">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm text-el-text-secondary">检测模式</span>
        <ElRadioGroup v-model="mode">
          <ElRadioButton label="blink" value="blink">仅眨眼检测</ElRadioButton>
          <ElRadioButton label="multi" value="multi">多维度检测</ElRadioButton>
        </ElRadioGroup>
        <ElButton type="primary" @click="simulateFrame">模拟检测一帧</ElButton>
        <ElButton @click="resetState">重置状态</ElButton>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(name, index) in livenessDimensions"
          :key="name"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">{{ name }}</span>
            <ElTag :type="scores[index] ? 'success' : 'info'">{{ scores[index] }}</ElTag>
          </div>
          <div class="mt-2 text-sm text-el-text-secondary">
            {{ scores[index] ? '当前维度已达标' : '当前维度未达标' }}
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">连续有效帧</div>
          <div class="mt-2 text-2xl font-semibold">{{ frameCount }} / 8</div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">达标维度数</div>
          <div class="mt-2 text-2xl font-semibold">{{ passedCount }} / 6</div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">判定结果</div>
          <div
            class="mt-2 text-2xl font-semibold"
            :class="resultText.includes('通过') ? 'text-green-600' : 'text-red-600'"
          >
            {{ resultText }}
          </div>
        </div>
      </div>
    </ElCard>

    <ElAlert
      title="说明：当前页面为纯静态交互演示，不接入摄像头，不包含任何 Python 或算法推理代码。"
      type="info"
      :closable="false"
    />
  </div>
</template>
