<script setup lang="ts">
import { antiAttackRows } from './data';

defineOptions({
  name: 'FaceSystemAntiAttack',
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElAlert
      title="升级重点：通过多维度活体动作和光流防翻拍策略，提升对伪造人脸的识别能力。"
      type="warning"
      :closable="false"
    />

    <ElCard header="防攻击测试对比">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-el-fill-lighter">
              <th class="border border-el-border-light px-3 py-2 text-left">攻击类型</th>
              <th class="border border-el-border-light px-3 py-2 text-left">升级前 V1.0</th>
              <th class="border border-el-border-light px-3 py-2 text-left">升级后 V2.0</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in antiAttackRows" :key="item.type">
              <td class="border border-el-border-light px-3 py-2">{{ item.type }}</td>
              <td class="border border-el-border-light px-3 py-2">{{ item.before }}</td>
              <td class="border border-el-border-light px-3 py-2">{{ item.after }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ElCard>

    <ElCard header="安全收益说明">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="font-semibold">静态照片防护</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            通过动作校验和关键点运动检测，避免照片直接冒充真人。
          </div>
        </div>
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="font-semibold">翻拍视频防护</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            通过光流特征变化识别电子屏翻拍内容，降低误通过率。
          </div>
        </div>
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="font-semibold">短视频攻击防护</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">
            利用多动作组合校验，识别视频回放中难以同步满足的行为特征。
          </div>
        </div>
      </div>
    </ElCard>
  </div>
</template>
