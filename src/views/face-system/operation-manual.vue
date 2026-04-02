<script setup lang="ts">
import { faqRows } from './data';

defineOptions({
  name: 'FaceSystemOperationManual',
});

const steps = [
  '进入左侧菜单“快速活体检测系统”。',
  '先查看“升级总览”确认系统功能范围。',
  '进入“活体检测模块”切换模式并模拟检测状态。',
  '进入“人脸识别模块”查看识别联动展示。',
  '最后查看“测试报告模块”确认验收结果。',
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="操作步骤">
      <ElTimeline>
        <ElTimelineItem v-for="step in steps" :key="step" type="primary" hollow>
          {{ step }}
        </ElTimelineItem>
      </ElTimeline>
    </ElCard>

    <ElCard header="界面说明">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="font-semibold">仅眨眼模式</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            演示升级前逻辑，重点突出连续 8 帧眨眼通过的判定方式。
          </div>
        </div>
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="font-semibold">多维度模式</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            演示升级后逻辑，重点展示多个动作维度和防翻拍能力。
          </div>
        </div>
      </div>
    </ElCard>

    <ElCard header="常见问题">
      <ElTable :data="faqRows" border>
        <ElTableColumn prop="question" label="问题现象" min-width="220" />
        <ElTableColumn prop="answer" label="处理建议" min-width="320" />
      </ElTable>
    </ElCard>
  </div>
</template>
