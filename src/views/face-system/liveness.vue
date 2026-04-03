<script setup lang="ts">
import { computed, ref } from 'vue';
import { livenessDimensions } from './data';

defineOptions({
  name: 'FaceSystemLiveness',
});

const mode = ref<'blink' | 'multi'>('multi');
const frameCount = ref(8);
const scores = ref([1, 1, 1, 0, 1, 1]);
const compareVisible = ref(false);
const beforeKeywords = ['单眨眼检测', '单动作校验', '基础活体提示', '静态照片防护'];
const afterKeywords = ['关键点动态运动', '摇头检测', '嘴部开合检测', '光流防翻拍', '多维度活体'];

const passedCount = computed(() => scores.value.filter(Boolean).length);
const resultText = computed(() => {
  if (mode.value === 'blink') {
    return scores.value[0] === 1 && frameCount.value >= 8 ? '活体验证通过' : '活体验证未通过';
  }
  return passedCount.value >= 3 && frameCount.value >= 8 ? '活体验证通过' : '活体验证未通过';
});

function simulateFrame() {
  scores.value = scores.value.map(() => Math.round(Math.random()));
  frameCount.value = 6 + Math.floor(Math.random() * 4);
}

function resetState() {
  scores.value = [0, 0, 0, 0, 0, 0];
  frameCount.value = 0;
}

const livenessCompareRows = [
  {
    category: '活体检测维度',
    before: '主要依赖眨眼单动作检测，动作维度较单一。',
    after: '支持眨眼、摇头、张嘴、点头、关键点动态运动、光流防翻拍等多维度联合检测。',
  },
  {
    category: '攻击拦截能力',
    before: '可拦截静态照片，但对电子屏翻拍、短视频回放防护能力有限。',
    after: '通过动作组合与光流特征协同，可有效识别电子屏翻拍与短视频攻击。',
  },
  {
    category: '检测提示方式',
    before: '界面只提示“请眨眼”，用户不知道当前失败原因。',
    after: '界面可展示多动作提示、维度得分和实时状态，交互更清晰。',
  },
  {
    category: '适配场景',
    before: '更适合低安全级别、快速验证场景。',
    after: '可适配厂区入口、访客机、中控室等不同安全等级场景。',
  },
];

const livenessExamples = [
  {
    scene: '静态照片攻击',
    before: '旧方案主要依赖眼部变化，部分极端角度下需要人工复核。',
    after: '新方案不仅看动作，还看关键点与光流特征，照片几乎无法通过。',
  },
  {
    scene: '电子屏翻拍攻击',
    before: '面对平板或手机翻拍人脸时，旧方案存在误判窗口。',
    after: '新方案加入光流防翻拍后，可识别屏幕纹理和运动异常特征。',
  },
  {
    scene: '真人轻微摇头验证',
    before: '旧方案无法利用摇头动作完成校验，只能反复提示眨眼。',
    after: '新方案支持多个动作维度，用户可通过更自然的动作完成验证。',
  },
  {
    scene: '领导演示场景',
    before: '只能展示单个眨眼结果，视觉效果较弱。',
    after: '可展示多个维度分数、通过逻辑和防攻击说明，演示效果更完整。',
  },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">活体检测模块演示</span>
          <ElButton type="primary" plain @click="compareVisible = true">升级前后对比</ElButton>
        </div>
      </template>
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm text-el-text-secondary">检测模式</span>
        <ElRadioGroup v-model="mode">
          <ElRadioButton label="blink" value="blink">仅眨眼检测</ElRadioButton>
          <ElRadioButton label="multi" value="multi">多维度检测</ElRadioButton>
        </ElRadioGroup>
        <ElButton type="primary" @click="simulateFrame">模拟检测一帧</ElButton>
        <ElButton @click="resetState">重置状态</ElButton>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(name, index) in livenessDimensions"
          :key="name"
          class="rounded-lg border border-el-border-light p-4"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">{{ name }}</span>
            <ElTag :type="scores[index] ? 'success' : 'info'">{{ scores[index] }}</ElTag>
          </div>
          <div class="mt-2 text-sm text-el-text-secondary">
            {{ scores[index] ? '当前维度已达标' : '当前维度未达标' }}
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">连续有效帧</div>
          <div class="mt-2 text-2xl font-semibold">{{ frameCount }} / 8</div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">达标维度数</div>
          <div class="mt-2 text-2xl font-semibold">{{ passedCount }} / 6</div>
        </div>
        <div class="rounded-lg bg-el-fill-light p-4">
          <div class="text-sm text-el-text-secondary">判定结果</div>
          <div
            class="mt-2 text-2xl font-semibold"
            :class="resultText.includes('通过') ? 'text-green-600' : 'text-red-600'"
          >
            {{ resultText }}
          </div>
        </div>
      </div>
    </ElCard>

    <ElAlert
      title="说明：当前页面为纯静态交互演示，不接入摄像头，不包含任何 Python 或算法推理代码。"
      type="info"
      :closable="false"
    />

    <ElDrawer v-model="compareVisible" title="活体检测模块升级前后对比" size="55%">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div class="compare-panel before-panel">
            <div class="compare-title">升级前活体方案</div>
            <div class="compare-desc">
              主要依靠眨眼这一单一动作完成活体判断，面对翻拍视频和短视频重放时，防护维度不足，展示效果也相对单薄。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in beforeKeywords" :key="item" effect="dark" type="danger">
                {{ item }}
              </ElTag>
            </div>
          </div>
          <div class="compare-panel after-panel">
            <div class="compare-title">升级后活体方案</div>
            <div class="compare-desc">
              采用多维度动作校验与光流防翻拍协同检测，不仅能识别真人动作，还能对电子屏翻拍和重放攻击形成更强拦截。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in afterKeywords" :key="item" effect="dark" type="success">
                {{ item }}
              </ElTag>
            </div>
          </div>
        </div>

        <ElCard header="技术能力对比">
          <ElTable :data="livenessCompareRows" border>
            <ElTableColumn prop="category" label="对比项" min-width="140" />
            <ElTableColumn prop="before" label="升级前" min-width="280" />
            <ElTableColumn prop="after" label="升级后" min-width="320" />
          </ElTable>
        </ElCard>

        <ElCard header="典型演示示例">
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="item in livenessExamples"
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
