<script setup lang="ts">
import { testRows } from './data';

defineOptions({
  name: 'FaceSystemTestReport',
});

const basicInfo = [
  { label: '测试名称', value: '快速活体检测人脸识别及智能防撞报警综合系统升级前后性能对比测试' },
  { label: '测试时间', value: '升级实施第 4 - 5 个工作日' },
  { label: '测试环境', value: '与实际部署环境一致的服务器、摄像头与报警设备' },
  { label: '测试目的', value: '验证升级后多维度活体、人脸识别和防撞报警功能的稳定性与准确性' },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="测试基本信息">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          v-for="item in basicInfo"
          :key="item.label"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="text-sm text-el-text-secondary">{{ item.label }}</div>
          <div class="mt-2 text-sm leading-6">{{ item.value }}</div>
        </div>
      </div>
    </ElCard>

    <ElCard header="测试结果汇总">
      <ElTable :data="testRows" border>
        <ElTableColumn prop="module" label="测试模块" min-width="140" />
        <ElTableColumn prop="item" label="测试项" min-width="160" />
        <ElTableColumn prop="expected" label="预期结果" min-width="220" />
        <ElTableColumn prop="before" label="升级前" min-width="140" />
        <ElTableColumn prop="after" label="升级后" min-width="160" />
        <ElTableColumn prop="status" label="状态" width="100" />
      </ElTable>
    </ElCard>

    <ElCard header="测试结论">
      <div class="space-y-3 text-sm leading-6 text-el-text-secondary">
        <p>本次升级后的静态后台演示完整覆盖了方案文档中的核心模块，便于汇报、展示与结构确认。</p>
        <p>
          从文档结果来看，升级后系统在活体检测维度、防翻拍能力和交互可视化方面均明显优于升级前版本。
        </p>
        <p>智能防撞报警模块在升级后继续保持稳定，与新增模块协同运行无冲突。</p>
      </div>
    </ElCard>
  </div>
</template>
