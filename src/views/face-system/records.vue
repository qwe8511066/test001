<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { VerificationRecordItem } from './mock';
import { seedVerificationRecordList } from './mock';

defineOptions({
  name: 'FaceSystemRecords',
});

const list = ref<VerificationRecordItem[]>([...seedVerificationRecordList]);
const detailVisible = ref(false);
const currentRecord = ref<VerificationRecordItem | null>(null);

const filters = reactive({
  keyword: '',
  result: '',
  department: '',
});

const departments = computed(() => [...new Set(list.value.map((item) => item.department))]);

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const matchKeyword =
      !filters.keyword ||
      [item.name, item.employeeNo, item.strategyName, item.device].some((value) =>
        value.includes(filters.keyword),
      );
    const matchResult = !filters.result || item.result === filters.result;
    const matchDepartment = !filters.department || item.department === filters.department;
    return matchKeyword && matchResult && matchDepartment;
  });
});

const summary = computed(() => ({
  total: list.value.length,
  pass: list.value.filter((item) => item.result === '通过').length,
  fail: list.value.filter((item) => item.result === '失败').length,
}));

function openDetail(row: VerificationRecordItem) {
  currentRecord.value = row;
  detailVisible.value = true;
}

async function handleDelete(row: VerificationRecordItem) {
  try {
    await ElMessageBox.confirm(`确认删除记录「${row.id}」吗？`, '提示', { type: 'warning' });
    list.value = list.value.filter((item) => item.id !== row.id);
    ElMessage.success('记录已删除');
  } catch {}
}

function addMockRecord() {
  const nextId = Math.max(...list.value.map((item) => item.id), 0) + 1;
  list.value.unshift({
    id: nextId,
    name: '演示访客',
    employeeNo: `VIS-${String(nextId).padStart(4, '0')}`,
    department: '访客',
    strategyName: '访客临时校验策略',
    result: nextId % 2 === 0 ? '通过' : '失败',
    score: nextId % 2 === 0 ? 93 : 56,
    attackType: nextId % 2 === 0 ? '真人' : '电子屏翻拍',
    device: 'Guest-Cam-01',
    verifyTime: '2026-04-02 09:40:00',
  });
  ElMessage.success('已追加一条模拟验证记录');
}

function resetFilters() {
  filters.keyword = '';
  filters.result = '';
  filters.department = '';
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ElCard>
        <div class="text-sm text-el-text-secondary">记录总数</div>
        <div class="mt-2 text-2xl font-semibold">{{ summary.total }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">通过记录</div>
        <div class="mt-2 text-2xl font-semibold text-green-600">{{ summary.pass }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">失败记录</div>
        <div class="mt-2 text-2xl font-semibold text-red-500">{{ summary.fail }}</div>
      </ElCard>
    </div>

    <ElCard header="验证记录查询">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <ElInput
          v-model="filters.keyword"
          placeholder="搜索姓名/工号/策略/设备"
          clearable
          class="w-64"
        />
        <ElSelect v-model="filters.department" placeholder="部门" clearable class="w-40">
          <ElOption v-for="item in departments" :key="item" :label="item" :value="item" />
        </ElSelect>
        <ElSelect v-model="filters.result" placeholder="结果" clearable class="w-36">
          <ElOption label="通过" value="通过" />
          <ElOption label="失败" value="失败" />
        </ElSelect>
        <ElButton type="primary">查询</ElButton>
        <ElButton @click="resetFilters">重置</ElButton>
        <ElButton type="success" @click="addMockRecord">新增模拟记录</ElButton>
      </div>

      <ElTable :data="filteredList" border>
        <ElTableColumn prop="id" label="记录ID" width="90" />
        <ElTableColumn prop="name" label="姓名" min-width="100" />
        <ElTableColumn prop="employeeNo" label="工号" min-width="130" />
        <ElTableColumn prop="department" label="部门" min-width="120" />
        <ElTableColumn prop="strategyName" label="策略名称" min-width="170" />
        <ElTableColumn label="验证结果" min-width="100">
          <template #default="{ row }">
            <ElTag :type="row.result === '通过' ? 'success' : 'danger'">{{ row.result }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="score" label="得分" min-width="80" />
        <ElTableColumn prop="attackType" label="攻击类型" min-width="120" />
        <ElTableColumn prop="device" label="设备" min-width="120" />
        <ElTableColumn prop="verifyTime" label="验证时间" min-width="170" />
        <ElTableColumn label="操作" fixed="right" min-width="180">
          <template #default="{ row }">
            <ElButton type="primary" link @click="openDetail(row)">详情</ElButton>
            <ElButton type="danger" link @click="handleDelete(row)">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElDrawer v-model="detailVisible" title="验证记录详情" size="40%">
      <ElDescriptions v-if="currentRecord" :column="1" border>
        <ElDescriptionsItem label="姓名">{{ currentRecord.name }}</ElDescriptionsItem>
        <ElDescriptionsItem label="工号">{{ currentRecord.employeeNo }}</ElDescriptionsItem>
        <ElDescriptionsItem label="部门">{{ currentRecord.department }}</ElDescriptionsItem>
        <ElDescriptionsItem label="策略">{{ currentRecord.strategyName }}</ElDescriptionsItem>
        <ElDescriptionsItem label="验证结果">{{ currentRecord.result }}</ElDescriptionsItem>
        <ElDescriptionsItem label="检测得分">{{ currentRecord.score }}</ElDescriptionsItem>
        <ElDescriptionsItem label="攻击类型">{{ currentRecord.attackType }}</ElDescriptionsItem>
        <ElDescriptionsItem label="设备编号">{{ currentRecord.device }}</ElDescriptionsItem>
        <ElDescriptionsItem label="验证时间">{{ currentRecord.verifyTime }}</ElDescriptionsItem>
      </ElDescriptions>
    </ElDrawer>
  </div>
</template>
