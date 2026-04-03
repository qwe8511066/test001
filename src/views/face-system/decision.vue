<script setup lang="ts">
import { computed, ref } from 'vue';
import { decisionRules } from './data';

defineOptions({
  name: 'FaceSystemDecision',
});

const blinkPassed = ref(true);
const multiDimensionPassed = ref(4);
const frameCount = ref(8);
const compareVisible = ref(false);
const beforeKeywords = ['连续 8 帧眨眼', '单规则判定', '固定通行逻辑', '低扩展性'];
const afterKeywords = ['多维度规则引擎', '任意 3 维达标', '连续帧稳定验证', '分场景策略配置'];

const multiDecision = computed(() => multiDimensionPassed.value >= 3 && frameCount.value >= 8);

const decisionCompareRows = [
  {
    category: '判定规则',
    before: '只要连续 8 帧检测到眨眼即可判定通过，规则比较单一。',
    after: '要求任意 3 个维度达标并连续 8 帧稳定通过，判定更严格。',
  },
  {
    category: '失败原因定位',
    before: '通常只能看到“未通过”，很难区分是动作不足还是攻击行为。',
    after: '可结合多个维度得分判断是眨眼不足、摇头不足、光流异常还是关键点异常。',
  },
  {
    category: '安全性',
    before: '单规则更容易被针对性模拟。',
    after: '多规则组合使攻击者更难同时满足多个条件。',
  },
  {
    category: '业务弹性',
    before: '不同区域只能沿用同一眨眼规则，难以分级配置。',
    after: '可根据场景设置仅眨眼模式、标准多维模式、高安全模式等不同策略。',
  },
];

const decisionExamples = [
  {
    scene: '普通办公区快速放行',
    before: '旧逻辑只看眨眼，虽然快，但对复杂风险场景适应有限。',
    after: '新系统可继续保留仅眨眼模式，兼顾老习惯和快速通行。',
  },
  {
    scene: '厂区入口标准校验',
    before: '所有人统一按眨眼规则处理，无法体现风险分级。',
    after: '可采用“任意 3 维度 + 连续 8 帧”的标准规则，平衡效率与安全。',
  },
  {
    scene: '中控室高安全校验',
    before: '旧逻辑无法表达高等级区域的更高要求。',
    after: '可进一步提高到 4 个维度甚至 10 帧稳定通过，逻辑扩展性更强。',
  },
  {
    scene: '攻击重放场景',
    before: '攻击者只需针对眨眼行为做模拟，规则可预测性较高。',
    after: '攻击者必须同时满足动作组合、关键点变化和防翻拍校验，难度显著提高。',
  },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">活体判定逻辑</span>
          <ElButton type="primary" plain @click="compareVisible = true">升级前后对比</ElButton>
        </div>
      </template>
      <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div
          v-for="item in decisionRules"
          :key="item.title"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="text-base font-semibold">{{ item.title }}</div>
          <div class="mt-2 text-sm leading-6 text-el-text-secondary">{{ item.detail }}</div>
        </div>
      </div>
    </ElCard>

    <ElCard header="规则判定示例">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">仅眨眼模式</div>
          <div class="mt-2 text-sm">眨眼得分：{{ blinkPassed ? 1 : 0 }}</div>
          <div class="text-sm">连续有效帧：{{ frameCount }}</div>
          <ElTag class="mt-3" :type="blinkPassed && frameCount >= 8 ? 'success' : 'danger'">
            {{ blinkPassed && frameCount >= 8 ? '通过' : '未通过' }}
          </ElTag>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">多维度模式</div>
          <div class="mt-2 text-sm">已达标维度：{{ multiDimensionPassed }}</div>
          <div class="text-sm">连续有效帧：{{ frameCount }}</div>
          <ElTag class="mt-3" :type="multiDecision ? 'success' : 'danger'">
            {{ multiDecision ? '通过' : '未通过' }}
          </ElTag>
        </div>
      </div>
    </ElCard>

    <ElDrawer v-model="compareVisible" title="判定逻辑模块升级前后对比" size="55%">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div class="compare-panel before-panel">
            <div class="compare-title">升级前判定逻辑</div>
            <div class="compare-desc">
              采用单规则判定，只围绕眨眼动作做连续帧校验，虽然逻辑简单，但在高安全场景下难以体现风险分层和策略扩展。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in beforeKeywords" :key="item" effect="dark" type="danger">
                {{ item }}
              </ElTag>
            </div>
          </div>
          <div class="compare-panel after-panel">
            <div class="compare-title">升级后判定逻辑</div>
            <div class="compare-desc">
              引入多维度规则引擎，可按场景设置维度数量、连续帧要求和安全等级，让办公区与中控室使用不同的放行策略。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in afterKeywords" :key="item" effect="dark" type="success">
                {{ item }}
              </ElTag>
            </div>
          </div>
        </div>

        <ElCard header="判定能力对比">
          <ElTable :data="decisionCompareRows" border>
            <ElTableColumn prop="category" label="对比项" min-width="140" />
            <ElTableColumn prop="before" label="升级前" min-width="280" />
            <ElTableColumn prop="after" label="升级后" min-width="320" />
          </ElTable>
        </ElCard>

        <ElCard header="业务示例说明">
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="item in decisionExamples"
              :key="item.scene"
              class="rounded-lg border border-el-border-light p-4"
            >
              <div class="font-semibold">{{ item.scene }}</div>
              <div class="mt-3 text-sm leading-6 text-el-text-secondary">
                <div><span class="font-medium text-el-text-primary">升级前：</span>{{ item.before }}</div>
                <div class="mt-2">
                  <span class="font-medium text-el-text-primary">升级后：</span>{{ item.after }}
                </div>
              </div>
            </div>
          </div>
        </ElCard>
      </div>
    </ElDrawer>
  </div>
</template>

<style scoped lang="scss">
.compare-panel {
  padding: 18px;
  border-radius: 14px;
  border: 1px solid;
}

.before-panel {
  border-color: #fca5a5;
  background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
  box-shadow: 0 10px 24px rgb(239 68 68 / 0.12);
}

.after-panel {
  border-color: #86efac;
  background: linear-gradient(135deg, #ecfdf5 0%, #dcfce7 100%);
  box-shadow: 0 10px 24px rgb(34 197 94 / 0.12);
}

.compare-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.compare-desc {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.8;
  color: #475569;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}
</style>
