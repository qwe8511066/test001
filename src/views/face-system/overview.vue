<script setup lang="ts">
import { computed } from 'vue';
import { comparisonRows, moduleSummaries } from './data';
import {
  seedAlarmEventList,
  seedPersonnelList,
  seedStrategyList,
  seedVerificationRecordList,
} from './mock';

defineOptions({
  name: 'FaceSystemOverview',
});

const overviewMetrics = computed(() => [
  {
    title: '人员档案数',
    value: seedPersonnelList.length,
    desc: '覆盖员工、访客和管理员样例档案',
  },
  {
    title: '策略模板数',
    value: seedStrategyList.length,
    desc: '涵盖入口、办公区、中控室、访客场景',
  },
  {
    title: '验证记录数',
    value: seedVerificationRecordList.length,
    desc: '包含通过、失败、翻拍拦截等多种结果',
  },
  {
    title: '报警事件数',
    value: seedAlarmEventList.length,
    desc: '包含待处理、处理中、已关闭等状态',
  },
]);

const recentRecords = seedVerificationRecordList.slice(0, 5);
const recentAlarms = seedAlarmEventList.slice(0, 4);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ElCard v-for="item in overviewMetrics" :key="item.title">
        <div class="text-sm text-el-text-secondary">{{ item.title }}</div>
        <div class="mt-2 text-2xl font-semibold">{{ item.value }}</div>
        <div class="mt-2 text-xs text-el-text-secondary">{{ item.desc }}</div>
      </ElCard>
    </div>

    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-base font-semibold">快速活体检测人脸识别及智能防撞报警综合系统</span>
          <ElTag type="success">静态后台演示版</ElTag>
        </div>
      </template>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">升级目标</div>
          <div class="mt-2 text-sm leading-6">
            在保留原有人脸识别与智能防撞报警能力的前提下，补充多维度活体检测能力。
          </div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">升级范围</div>
          <div class="mt-2 text-sm leading-6">
            覆盖人脸识别模块、活体检测模块、界面配置、部署流程与测试报告。
          </div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">实现形式</div>
          <div class="mt-2 text-sm leading-6">
            采用当前后台管理系统承载业务页面，全部内容为可运行的静态 Vue 页面。
          </div>
        </div>
      </div>
    </ElCard>

    <ElCard header="升级前后功能对比">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-el-fill-lighter">
              <th class="border border-el-border-light px-3 py-2 text-left">功能类别</th>
              <th class="border border-el-border-light px-3 py-2 text-left">升级前 V1.0</th>
              <th class="border border-el-border-light px-3 py-2 text-left">升级后 V2.0</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparisonRows" :key="row.category">
              <td class="border border-el-border-light px-3 py-2">{{ row.category }}</td>
              <td class="border border-el-border-light px-3 py-2">{{ row.before }}</td>
              <td class="border border-el-border-light px-3 py-2">{{ row.after }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ElCard>

    <ElCard header="模块清单">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="item in moduleSummaries"
          :key="item.title"
          class="rounded-lg border border-el-border-light p-4 duration-300 hover:shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="font-semibold">{{ item.title }}</span>
            <ElTag size="small">{{ item.tag }}</ElTag>
          </div>
          <div class="mt-3 text-sm leading-6 text-el-text-secondary">{{ item.desc }}</div>
        </div>
      </div>
    </ElCard>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <ElCard header="最近验证记录">
        <ElTable :data="recentRecords" border>
          <ElTableColumn prop="name" label="姓名" min-width="90" />
          <ElTableColumn prop="strategyName" label="策略" min-width="150" />
          <ElTableColumn label="结果" min-width="80">
            <template #default="{ row }">
              <ElTag :type="row.result === '通过' ? 'success' : 'danger'">{{ row.result }}</ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="attackType" label="攻击类型" min-width="100" />
          <ElTableColumn prop="verifyTime" label="时间" min-width="170" />
        </ElTable>
      </ElCard>

      <ElCard header="最近报警事件">
        <ElTable :data="recentAlarms" border>
          <ElTableColumn prop="eventNo" label="事件编号" min-width="150" />
          <ElTableColumn prop="area" label="区域" min-width="100" />
          <ElTableColumn prop="level" label="等级" min-width="70" />
          <ElTableColumn label="状态" min-width="90">
            <template #default="{ row }">
              <ElTag
                :type="
                  row.status === '已关闭'
                    ? 'success'
                    : row.status === '处理中'
                      ? 'warning'
                      : 'danger'
                "
              >
                {{ row.status }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="triggerTime" label="时间" min-width="170" />
        </ElTable>
      </ElCard>
    </div>
  </div>
</template>
