<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { AlarmEventItem } from './mock';
import { seedAlarmEventList } from './mock';

defineOptions({
  name: 'FaceSystemAlarms',
});

type FormMode = 'add' | 'edit';

const list = ref<AlarmEventItem[]>([...seedAlarmEventList]);
const dialogVisible = ref(false);
const formMode = ref<FormMode>('add');

const filters = reactive({
  keyword: '',
  status: '',
  level: '',
});

const createFormState = (): AlarmEventItem => ({
  id: 0,
  eventNo: '',
  area: '',
  level: '二级',
  source: '活体检测拦截',
  status: '待处理',
  handler: '未分配',
  triggerTime: '2026-04-02 09:45:00',
  description: '',
});

const formState = reactive<AlarmEventItem>(createFormState());

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const matchKeyword =
      !filters.keyword ||
      [item.eventNo, item.area, item.source, item.handler].some((value) =>
        value.includes(filters.keyword),
      );
    const matchStatus = !filters.status || item.status === filters.status;
    const matchLevel = !filters.level || item.level === filters.level;
    return matchKeyword && matchStatus && matchLevel;
  });
});

const summary = computed(() => ({
  total: list.value.length,
  pending: list.value.filter((item) => item.status === '待处理').length,
  processing: list.value.filter((item) => item.status === '处理中').length,
  closed: list.value.filter((item) => item.status === '已关闭').length,
}));

function openAddDialog() {
  formMode.value = 'add';
  Object.assign(formState, createFormState());
  formState.eventNo = `ALM-20260402-${String(list.value.length + 1).padStart(3, '0')}`;
  dialogVisible.value = true;
}

function openEditDialog(row: AlarmEventItem) {
  formMode.value = 'edit';
  Object.assign(formState, row);
  dialogVisible.value = true;
}

function saveItem() {
  if (!formState.eventNo || !formState.area || !formState.description) {
    ElMessage.warning('请补全事件编号、区域和事件描述');
    return;
  }

  if (formMode.value === 'add') {
    const nextId = Math.max(...list.value.map((item) => item.id), 0) + 1;
    list.value.unshift({ ...formState, id: nextId });
    ElMessage.success('新增报警事件成功');
  } else {
    const index = list.value.findIndex((item) => item.id === formState.id);
    if (index !== -1) {
      list.value[index] = { ...formState };
      ElMessage.success('报警事件已更新');
    }
  }
  dialogVisible.value = false;
}

async function handleDelete(row: AlarmEventItem) {
  try {
    await ElMessageBox.confirm(`确认删除报警事件「${row.eventNo}」吗？`, '提示', {
      type: 'warning',
    });
    list.value = list.value.filter((item) => item.id !== row.id);
    ElMessage.success('删除成功');
  } catch {}
}

function quickClose(row: AlarmEventItem) {
  row.status = '已关闭';
  if (!row.handler || row.handler === '未分配') {
    row.handler = '演示处理人';
  }
  ElMessage.success('事件已关闭');
}

function resetFilters() {
  filters.keyword = '';
  filters.status = '';
  filters.level = '';
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ElCard>
        <div class="text-sm text-el-text-secondary">报警总数</div>
        <div class="mt-2 text-2xl font-semibold">{{ summary.total }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">待处理</div>
        <div class="mt-2 text-2xl font-semibold text-red-500">{{ summary.pending }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">处理中</div>
        <div class="mt-2 text-2xl font-semibold text-orange-500">
          {{ summary.processing }}
        </div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">已关闭</div>
        <div class="mt-2 text-2xl font-semibold text-green-600">{{ summary.closed }}</div>
      </ElCard>
    </div>

    <ElCard header="报警事件管理">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <ElInput
          v-model="filters.keyword"
          placeholder="搜索事件编号/区域/来源/处理人"
          clearable
          class="w-72"
        />
        <ElSelect v-model="filters.level" placeholder="报警等级" clearable class="w-36">
          <ElOption label="一级" value="一级" />
          <ElOption label="二级" value="二级" />
          <ElOption label="三级" value="三级" />
        </ElSelect>
        <ElSelect v-model="filters.status" placeholder="处理状态" clearable class="w-36">
          <ElOption label="待处理" value="待处理" />
          <ElOption label="处理中" value="处理中" />
          <ElOption label="已关闭" value="已关闭" />
        </ElSelect>
        <ElButton type="primary">查询</ElButton>
        <ElButton @click="resetFilters">重置</ElButton>
        <ElButton type="success" @click="openAddDialog">新增事件</ElButton>
      </div>

      <ElTable :data="filteredList" border>
        <ElTableColumn prop="eventNo" label="事件编号" min-width="160" />
        <ElTableColumn prop="area" label="报警区域" min-width="120" />
        <ElTableColumn prop="level" label="等级" min-width="80" />
        <ElTableColumn prop="source" label="来源" min-width="130" />
        <ElTableColumn label="状态" min-width="90">
          <template #default="{ row }">
            <ElTag
              :type="
                row.status === '已关闭' ? 'success' : row.status === '处理中' ? 'warning' : 'danger'
              "
            >
              {{ row.status }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="handler" label="处理人" min-width="100" />
        <ElTableColumn prop="triggerTime" label="触发时间" min-width="170" />
        <ElTableColumn prop="description" label="事件描述" min-width="260" show-overflow-tooltip />
        <ElTableColumn label="操作" fixed="right" min-width="250">
          <template #default="{ row }">
            <div class="flex gap-2">
              <ElButton type="primary" link @click="openEditDialog(row)">编辑</ElButton>
              <ElButton type="success" link @click="quickClose(row)">关闭</ElButton>
              <ElButton type="danger" link @click="handleDelete(row)">删除</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElDialog
      v-model="dialogVisible"
      :title="formMode === 'add' ? '新增报警事件' : '编辑报警事件'"
      width="760px"
    >
      <ElForm label-width="100px">
        <div class="grid grid-cols-2 gap-x-4">
          <ElFormItem label="事件编号"><ElInput v-model="formState.eventNo" /></ElFormItem>
          <ElFormItem label="报警区域"><ElInput v-model="formState.area" /></ElFormItem>
          <ElFormItem label="报警等级">
            <ElSelect v-model="formState.level">
              <ElOption label="一级" value="一级" />
              <ElOption label="二级" value="二级" />
              <ElOption label="三级" value="三级" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="报警来源"><ElInput v-model="formState.source" /></ElFormItem>
          <ElFormItem label="处理状态">
            <ElSelect v-model="formState.status">
              <ElOption label="待处理" value="待处理" />
              <ElOption label="处理中" value="处理中" />
              <ElOption label="已关闭" value="已关闭" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="处理人"><ElInput v-model="formState.handler" /></ElFormItem>
        </div>
        <ElFormItem label="事件描述">
          <ElInput v-model="formState.description" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveItem">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>
