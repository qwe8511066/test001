<script setup lang="ts">
import { demoCommands } from './data';

defineOptions({
  name: 'FaceSystemDeployGuide',
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="当前静态 Demo 部署方式">
      <ElSteps :active="3" finish-status="success">
        <ElStep title="安装依赖" description="准备 Node.js 18+ 与 pnpm 环境" />
        <ElStep title="本地启动" description="运行前端开发环境查看页面" />
        <ElStep title="打包部署" description="生成 dist 静态资源并发布" />
      </ElSteps>
    </ElCard>

    <ElCard header="命令清单">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          v-for="command in demoCommands"
          :key="command"
          class="rounded-lg border border-el-border-light bg-[#0f172a] p-4 font-mono text-sm text-white"
        >
          {{ command }}
        </div>
      </div>
    </ElCard>

    <ElCard header="说明">
      <div class="space-y-3 text-sm leading-6 text-el-text-secondary">
        <p>本页面展示的是纯静态 Vue 演示，不接 Python 后端，不调用摄像头，也不依赖任何模型文件。</p>
        <p>适合用于汇报展示、界面验收、菜单结构确认和交互流程预览。</p>
        <p>若后续需要接入真实接口，可以在当前页面基础上继续扩展 API 和状态流转逻辑。</p>
      </div>
    </ElCard>
  </div>
</template>
