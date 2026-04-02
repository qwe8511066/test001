<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { StrategyItem } from './mock';
import { seedStrategyList } from './mock';

defineOptions({
  name: 'FaceSystemStrategy',
});

type FormMode = 'add' | 'edit';

const list = ref<StrategyItem[]>([...seedStrategyList]);
const dialogVisible = ref(false);
const formMode = ref<FormMode>('add');

const filters = reactive({
  keyword: '',
  mode: '',
  status: '',
});

const dimensionOptions = ['眨眼', '摇头', '嘴部开合', '点头', '关键点运动', '光流防翻拍'];

const createFormState = (): StrategyItem => ({
  id: 0,
  name: '',
  mode: '多维度',
  sensitivity: '中',
  dimensions: ['眨眼', '摇头', '光流防翻拍'],
  frameRule: '任意 3 维度 + 连续 8 帧',
  antiReplay: '开启',
  status: '启用',
  scene: '',
  updatedAt: '2026-04-02 09:30:00',
});

const formState = reactive<StrategyItem>(createFormState());

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const matchKeyword =
      !filters.keyword || [item.name, item.scene].some((value) => value.includes(filters.keyword));
    const matchMode = !filters.mode || item.mode === filters.mode;
    const matchStatus = !filters.status || item.status === filters.status;
    return matchKeyword && matchMode && matchStatus;
  });
});

const summary = computed(() => ({
  total: list.value.length,
  enabled: list.value.filter((item) => item.status === '启用').length,
  highLevel: list.value.filter((item) => item.sensitivity === '高').length,
}));

function resetForm() {
  Object.assign(formState, createFormState());
}

function openAddDialog() {
  formMode.value = 'add';
  resetForm();
  dialogVisible.value = true;
}

function openEditDialog(row: StrategyItem) {
  formMode.value = 'edit';
  Object.assign(formState, { ...row, dimensions: [...row.dimensions] });
  dialogVisible.value = true;
}

function saveItem() {
  if (!formState.name || !formState.scene || formState.dimensions.length === 0) {
    ElMessage.warning('请填写策略名称、适用场景，并至少选择一个维度');
    return;
  }

  if (formMode.value === 'add') {
    const nextId = Math.max(...list.value.map((item) => item.id), 0) + 1;
    list.value.unshift({ ...formState, id: nextId, dimensions: [...formState.dimensions] });
    ElMessage.success('新增策略成功');
  } else {
    const index = list.value.findIndex((item) => item.id === formState.id);
    if (index !== -1) {
      list.value[index] = { ...formState, dimensions: [...formState.dimensions] };
      ElMessage.success('策略更新成功');
    }
  }
  dialogVisible.value = false;
}

async function handleDelete(row: StrategyItem) {
  try {
    await ElMessageBox.confirm(`确认删除策略「${row.name}」吗？`, '提示', { type: 'warning' });
    list.value = list.value.filter((item) => item.id !== row.id);
    ElMessage.success('删除成功');
  } catch {}
}

function toggleStatus(row: StrategyItem) {
  row.status = row.status === '启用' ? '停用' : '启用';
  row.updatedAt = '2026-04-02 09:35:00';
  ElMessage.success(`策略已${row.status === '启用' ? '启用' : '停用'}`);
}

function resetFilters() {
  filters.keyword = '';
  filters.mode = '';
  filters.status = '';
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ElCard>
        <div class="text-sm text-el-text-secondary">策略总数</div>
        <div class="mt-2 text-2xl font-semibold">{{ summary.total }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">启用策略</div>
        <div class="mt-2 text-2xl font-semibold text-green-600">{{ summary.enabled }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">高灵敏策略</div>
        <div class="mt-2 text-2xl font-semibold text-red-500">{{ summary.highLevel }}</div>
      </ElCard>
    </div>

    <ElCard header="活体策略管理">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <ElInput v-model="filters.keyword" placeholder="搜索策略名称/场景" clearable class="w-64" />
        <ElSelect v-model="filters.mode" placeholder="策略模式" clearable class="w-40">
          <ElOption label="仅眨眼" value="仅眨眼" />
          <ElOption label="多维度" value="多维度" />
        </ElSelect>
        <ElSelect v-model="filters.status" placeholder="状态" clearable class="w-36">
          <ElOption label="启用" value="启用" />
          <ElOption label="停用" value="停用" />
        </ElSelect>
        <ElButton type="primary">查询</ElButton>
        <ElButton @click="resetFilters">重置</ElButton>
        <ElButton type="success" @click="openAddDialog">新增策略</ElButton>
      </div>

      <ElTable :data="filteredList" border>
        <ElTableColumn prop="name" label="策略名称" min-width="180" />
        <ElTableColumn prop="scene" label="适用场景" min-width="120" />
        <ElTableColumn prop="mode" label="模式" min-width="100" />
        <ElTableColumn prop="sensitivity" label="灵敏度" min-width="90" />
        <ElTableColumn label="检测维度" min-width="240">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <ElTag v-for="item in row.dimensions" :key="item" size="small">{{ item }}</ElTag>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="frameRule" label="判定规则" min-width="190" />
        <ElTableColumn prop="antiReplay" label="防翻拍" min-width="90" />
        <ElTableColumn label="状态" min-width="90">
          <template #default="{ row }">
            <ElTag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="updatedAt" label="更新时间" min-width="170" />
        <ElTableColumn label="操作" fixed="right" min-width="250">
          <template #default="{ row }">
            <div class="flex gap-2">
              <ElButton type="primary" link @click="openEditDialog(row)">编辑</ElButton>
              <ElButton type="warning" link @click="toggleStatus(row)">
                {{ row.status === '启用' ? '停用' : '启用' }}
              </ElButton>
              <ElButton type="danger" link @click="handleDelete(row)">删除</ElButton>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElDialog
      v-model="dialogVisible"
      :title="formMode === 'add' ? '新增活体策略' : '编辑活体策略'"
      width="760px"
    >
      <ElForm label-width="110px">
        <div class="grid grid-cols-2 gap-x-4">
          <ElFormItem label="策略名称"><ElInput v-model="formState.name" /></ElFormItem>
          <ElFormItem label="适用场景"><ElInput v-model="formState.scene" /></ElFormItem>
          <ElFormItem label="策略模式">
            <ElSelect v-model="formState.mode">
              <ElOption label="仅眨眼" value="仅眨眼" />
              <ElOption label="多维度" value="多维度" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="灵敏度">
            <ElSelect v-model="formState.sensitivity">
              <ElOption label="低" value="低" />
              <ElOption label="中" value="中" />
              <ElOption label="高" value="高" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="防翻拍">
            <ElSelect v-model="formState.antiReplay">
              <ElOption label="开启" value="开启" />
              <ElOption label="关闭" value="关闭" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem label="状态">
            <ElSelect v-model="formState.status">
              <ElOption label="启用" value="启用" />
              <ElOption label="停用" value="停用" />
            </ElSelect>
          </ElFormItem>
        </div>
        <ElFormItem label="检测维度">
          <ElCheckboxGroup v-model="formState.dimensions">
            <ElCheckbox v-for="item in dimensionOptions" :key="item" :label="item" :value="item" />
          </ElCheckboxGroup>
        </ElFormItem>
        <ElFormItem label="判定规则"><ElInput v-model="formState.frameRule" /></ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveItem">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>
