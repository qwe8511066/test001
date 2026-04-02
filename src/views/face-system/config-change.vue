<script setup lang="ts">
import { configChangeRows } from './data';

defineOptions({
  name: 'FaceSystemConfigChange',
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="配置变更记录">
      <ElTable :data="configChangeRows" border>
        <ElTableColumn prop="id" label="序号" width="70" />
        <ElTableColumn prop="item" label="变更项" min-width="220" />
        <ElTableColumn prop="before" label="变更前" min-width="220" />
        <ElTableColumn prop="after" label="变更后" min-width="240" />
        <ElTableColumn prop="reason" label="变更原因" min-width="180" />
      </ElTable>
    </ElCard>

    <ElCard header="配置升级摘要">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="font-semibold">菜单配置</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            新增活体检测相关菜单项，方便用户切换模式与查看状态。
          </div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="font-semibold">界面配置</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            增加多维度得分、动作提示和状态反馈，让演示更直观。
          </div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="font-semibold">测试配置</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            补充防翻拍、摇头、张嘴等测试项目，保证验收项更完整。
          </div>
        </div>
      </div>
    </ElCard>
  </div>
</template>
