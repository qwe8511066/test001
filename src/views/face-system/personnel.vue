<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { PersonnelItem } from './mock';
import { seedPersonnelList } from './mock';

defineOptions({
  name: 'FaceSystemPersonnel',
});

type FormMode = 'add' | 'edit';

const list = ref<PersonnelItem[]>([...seedPersonnelList]);
const currentPage = ref(1);
const pageSize = ref(6);
const dialogVisible = ref(false);
const formMode = ref<FormMode>('add');

const filters = reactive({
  keyword: '',
  department: '',
  status: '',
});

const createFormState = (): PersonnelItem => ({
  id: 0,
  name: '',
  employeeNo: '',
  department: '',
  role: '',
  phone: '',
  similarityThreshold: 90,
  status: '启用',
  faceCount: 2,
  lastVerifyTime: '2026-04-02 09:30:00',
  remark: '',
});

const formState = reactive<PersonnelItem>(createFormState());

const departments = computed(() => [...new Set(list.value.map((item) => item.department))]);

const filteredList = computed(() => {
  return list.value.filter((item) => {
    const matchKeyword =
      !filters.keyword ||
      [item.name, item.employeeNo, item.role, item.phone].some((value) =>
        value.includes(filters.keyword),
      );
    const matchDepartment = !filters.department || item.department === filters.department;
    const matchStatus = !filters.status || item.status === filters.status;
    return matchKeyword && matchDepartment && matchStatus;
  });
});

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredList.value.slice(start, start + pageSize.value);
});

const summary = computed(() => {
  const enabledCount = list.value.filter((item) => item.status === '启用').length;
  const sampleCount = list.value.reduce((total, item) => total + item.faceCount, 0);
  return {
    total: list.value.length,
    enabledCount,
    disabledCount: list.value.length - enabledCount,
    sampleCount,
  };
});

function resetForm() {
  Object.assign(formState, createFormState());
}

function openAddDialog() {
  formMode.value = 'add';
  resetForm();
  dialogVisible.value = true;
}

function openEditDialog(row: PersonnelItem) {
  formMode.value = 'edit';
  Object.assign(formState, row);
  dialogVisible.value = true;
}

function saveItem() {
  if (!formState.name || !formState.employeeNo || !formState.department) {
    ElMessage.warning('请补全姓名、工号和所属部门');
    return;
  }

  if (formMode.value === 'add') {
    const nextId = Math.max(...list.value.map((item) => item.id), 0) + 1;
    list.value.unshift({ ...formState, id: nextId });
    ElMessage.success('新增档案成功');
  } else {
    const index = list.value.findIndex((item) => item.id === formState.id);
    if (index !== -1) {
      list.value[index] = { ...formState };
      ElMessage.success('编辑档案成功');
    }
  }

  dialogVisible.value = false;
}

async function handleDelete(row: PersonnelItem) {
  try {
    await ElMessageBox.confirm(`确认删除人员档案「${row.name}」吗？`, '提示', { type: 'warning' });
    list.value = list.value.filter((item) => item.id !== row.id);
    ElMessage.success('删除成功');
  } catch {}
}

function toggleStatus(row: PersonnelItem) {
  row.status = row.status === '启用' ? '停用' : '启用';
  ElMessage.success(`已${row.status === '启用' ? '启用' : '停用'}该档案`);
}

function resetFilters() {
  filters.keyword = '';
  filters.department = '';
  filters.status = '';
  currentPage.value = 1;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ElCard>
        <div class="text-sm text-el-text-secondary">人员总数</div>
        <div class="mt-2 text-2xl font-semibold">{{ summary.total }}</div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">启用档案</div>
        <div class="mt-2 text-2xl font-semibold text-green-600">
          {{ summary.enabledCount }}
        </div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">停用档案</div>
        <div class="mt-2 text-2xl font-semibold text-orange-500">
          {{ summary.disabledCount }}
        </div>
      </ElCard>
      <ElCard>
        <div class="text-sm text-el-text-secondary">人脸样本数</div>
        <div class="mt-2 text-2xl font-semibold">{{ summary.sampleCount }}</div>
      </ElCard>
    </div>

    <ElCard header="人员档案管理">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <ElInput
          v-model="filters.keyword"
          placeholder="搜索姓名/工号/岗位/手机号"
          clearable
          class="w-64"
        />
        <ElSelect v-model="filters.department" placeholder="所属部门" clearable class="w-44">
          <ElOption v-for="item in departments" :key="item" :label="item" :value="item" />
        </ElSelect>
        <ElSelect v-model="filters.status" placeholder="状态" clearable class="w-36">
          <ElOption label="启用" value="启用" />
          <ElOption label="停用" value="停用" />
        </ElSelect>
        <ElButton type="primary" @click="currentPage = 1">查询</ElButton>
        <ElButton @click="resetFilters">重置</ElButton>
        <ElButton type="success" @click="openAddDialog">新增人员</ElButton>
      </div>

      <ElTable :data="pagedList" border>
        <ElTableColumn prop="employeeNo" label="工号" min-width="130" />
        <ElTableColumn prop="name" label="姓名" min-width="100" />
        <ElTableColumn prop="department" label="部门" min-width="120" />
        <ElTableColumn prop="role" label="岗位" min-width="120" />
        <ElTableColumn prop="phone" label="手机号" min-width="130" />
        <ElTableColumn prop="similarityThreshold" label="识别阈值" min-width="100" />
        <ElTableColumn prop="faceCount" label="样本数" min-width="80" />
        <ElTableColumn label="状态" min-width="90">
          <template #default="{ row }">
            <ElTag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="lastVerifyTime" label="最近验证时间" min-width="170" />
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

      <div class="mt-4 flex justify-end">
        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="filteredList.length"
        />
      </div>
    </ElCard>

    <ElDialog
      v-model="dialogVisible"
      :title="formMode === 'add' ? '新增人员档案' : '编辑人员档案'"
      width="680px"
    >
      <ElForm label-width="100px">
        <div class="grid grid-cols-2 gap-x-4">
          <ElFormItem label="姓名"><ElInput v-model="formState.name" /></ElFormItem>
          <ElFormItem label="工号"><ElInput v-model="formState.employeeNo" /></ElFormItem>
          <ElFormItem label="部门"><ElInput v-model="formState.department" /></ElFormItem>
          <ElFormItem label="岗位"><ElInput v-model="formState.role" /></ElFormItem>
          <ElFormItem label="手机号"><ElInput v-model="formState.phone" /></ElFormItem>
          <ElFormItem label="识别阈值">
            <ElInputNumber
              v-model="formState.similarityThreshold"
              :min="80"
              :max="99"
              class="w-full!"
            />
          </ElFormItem>
          <ElFormItem label="样本数">
            <ElInputNumber v-model="formState.faceCount" :min="1" :max="8" class="w-full!" />
          </ElFormItem>
          <ElFormItem label="状态">
            <ElSelect v-model="formState.status">
              <ElOption label="启用" value="启用" />
              <ElOption label="停用" value="停用" />
            </ElSelect>
          </ElFormItem>
        </div>
        <ElFormItem label="备注">
          <ElInput v-model="formState.remark" type="textarea" :rows="3" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="saveItem">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>
