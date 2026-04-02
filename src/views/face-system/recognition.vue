<script setup lang="ts">
import { recognitionSteps } from './data';

defineOptions({
  name: 'FaceSystemRecognition',
});

const identityInfo = {
  name: '张三',
  similarity: '98.2%',
  timestamp: '2026-04-02 10:18:30',
  status: '待活体通过',
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="人脸识别模块状态">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="mb-3 text-sm font-semibold">识别结果展示</div>
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem label="人员姓名">{{ identityInfo.name }}</ElDescriptionsItem>
            <ElDescriptionsItem label="识别相似度">
              {{ identityInfo.similarity }}
            </ElDescriptionsItem>
            <ElDescriptionsItem label="识别时间">{{ identityInfo.timestamp }}</ElDescriptionsItem>
            <ElDescriptionsItem label="当前状态">{{ identityInfo.status }}</ElDescriptionsItem>
          </ElDescriptions>
        </div>
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="mb-3 text-sm font-semibold">模块说明</div>
          <div class="space-y-3 text-sm leading-6 text-el-text-secondary">
            <p>该页面用于静态展示识别模块与活体检测模块之间的联动关系。</p>
            <p>在实际系统中，只有活体验证通过后，识别流程才会正式触发。</p>
            <p>本 Demo 不接摄像头、不做人脸算法计算，仅模拟后台业务界面的展示效果。</p>
          </div>
        </div>
      </div>
    </ElCard>

    <ElCard header="识别联动流程">
      <ElTimeline>
        <ElTimelineItem v-for="step in recognitionSteps" :key="step" type="primary" hollow>
          {{ step }}
        </ElTimelineItem>
      </ElTimeline>
    </ElCard>
  </div>
</template>
