<script setup lang="ts">
defineOptions({
  name: 'FaceSystemCollisionAlarm',
});

const statusCards = [
  { title: '传感器状态', value: '正常', tag: 'success' },
  { title: '报警设备状态', value: '在线', tag: 'success' },
  { title: '联动接口状态', value: '已适配 V2.0', tag: 'warning' },
  { title: '最近报警时间', value: '2026-04-01 10:21:37', tag: 'info' },
];

const records = [
  { time: '2026-04-01 10:21:37', scene: '模拟碰撞测试', result: '触发报警成功' },
  { time: '2026-04-01 15:08:12', scene: '连续运行巡检', result: '无异常' },
  { time: '2026-04-02 09:35:54', scene: '联动适配验证', result: '模块协同正常' },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="智能防撞报警模块">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="card in statusCards"
          :key="card.title"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="text-sm text-el-text-secondary">{{ card.title }}</div>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-lg font-semibold">{{ card.value }}</span>
            <ElTag :type="card.tag">{{ card.value }}</ElTag>
          </div>
        </div>
      </div>
    </ElCard>

    <ElCard header="协同说明">
      <div class="space-y-3 text-sm leading-6 text-el-text-secondary">
        <p>
          智能防撞报警模块的核心功能在本次升级中保持不变，仅完成与 V2.0 人脸识别模块的协同适配。
        </p>
        <p>升级后可继续独立触发报警、保留报警记录，并在系统整体运行时与活体检测模块并行工作。</p>
      </div>
    </ElCard>

    <ElCard header="最近报警记录">
      <ElTable :data="records" border>
        <ElTableColumn prop="time" label="时间" min-width="180" />
        <ElTableColumn prop="scene" label="测试场景" min-width="180" />
        <ElTableColumn prop="result" label="结果" min-width="180" />
      </ElTable>
    </ElCard>
  </div>
</template>
