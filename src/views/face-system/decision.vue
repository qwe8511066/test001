<script setup lang="ts">
import { computed, ref } from 'vue';
import { decisionRules } from './data';

defineOptions({
  name: 'FaceSystemDecision',
});

const blinkPassed = ref(true);
const multiDimensionPassed = ref(4);
const frameCount = ref(8);

const multiDecision = computed(() => multiDimensionPassed.value >= 3 && frameCount.value >= 8);
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="活体判定逻辑">
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div
          v-for="item in decisionRules"
          :key="item.title"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="text-base font-semibold">{{ item.title }}</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">{{ item.detail }}</div>
        </div>
      </div>
    </ElCard>

    <ElCard header="规则判定示例">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">仅眨眼模式</div>
          <div class="mt-2 text-sm">眨眼得分：{{ blinkPassed ? 1 : 0 }}</div>
          <div class="text-sm">连续有效帧：{{ frameCount }}</div>
          <ElTag class="mt-3" :type="blinkPassed && frameCount >= 8 ? 'success' : 'danger'">
            {{ blinkPassed && frameCount >= 8 ? '通过' : '未通过' }}
          </ElTag>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">多维度模式</div>
          <div class="mt-2 text-sm">已达标维度：{{ multiDimensionPassed }}</div>
          <div class="text-sm">连续有效帧：{{ frameCount }}</div>
          <ElTag class="mt-3" :type="multiDecision ? 'success' : 'danger'">
            {{ multiDecision ? '通过' : '未通过' }}
          </ElTag>
        </div>
      </div>
    </ElCard>
  </div>
</template>
