<script setup lang="ts">
import { ref } from 'vue';
import { recognitionSteps } from './data';

defineOptions({
  name: 'FaceSystemRecognition',
});

const identityInfo = {
  name: '张三',
  similarity: '98.2%',
  timestamp: '2026-04-02 10:18:30',
  status: '待活体通过',
};

const compareVisible = ref(false);
const beforeKeywords = ['2D 特征比对', '基础人脸框定位', '静态特征向量', '单链路识别'];
const afterKeywords = ['关键点对齐', '质量评分筛选', '多特征融合识别', '活体前置联动'];

const recognitionCompareRows = [
  {
    category: '核心识别技术',
    before: '采用传统 2D 人脸特征比对方案，主要依赖基础人脸框定位和静态特征向量匹配。',
    after: '采用升级后的多特征融合识别方案，结合更稳定的人脸关键点对齐、质量筛选与特征向量比对。',
  },
  {
    category: '图像预处理能力',
    before: '仅进行基础裁剪和缩放，对逆光、偏头、轻度遮挡场景适应性较弱。',
    after: '加入人脸对齐、亮度均衡、质量评分筛选，低质量画面优先拦截，减少误识别。',
  },
  {
    category: '识别触发时机',
    before: '完成人脸检测后较早进入识别流程，容易受到活体校验能力不足影响。',
    after: '必须先经过多维度活体验证，再触发人脸识别，识别链路更安全。',
  },
  {
    category: '复杂场景鲁棒性',
    before: '面对侧脸、口罩边缘遮挡、屏幕翻拍时误判风险更高。',
    after: '通过活体前置校验与质量筛选协同，对复杂场景更稳定。',
  },
];

const recognitionExamples = [
  {
    scene: '厂区入口高峰通行',
    before: '人员快速走动、光线变化大时，旧方案识别速度快但稳定性一般，存在重复识别情况。',
    after: '新方案先过滤低质量帧，再在活体通过后识别，通行结果更稳定，误触发更少。',
  },
  {
    scene: '中控室高安全门禁',
    before: '若使用照片或录屏配合基础识别流程，存在绕过风险。',
    after: '必须先通过眨眼、摇头、张嘴等动作与防翻拍校验后，识别才会继续。',
  },
  {
    scene: '访客机临时验证',
    before: '对临时访客的低质量照片采集适配性一般，人工复核较多。',
    after: '通过质量评分和多维度活体联动，可更清晰地区分真人访客与伪造尝试。',
  },
  {
    scene: '夜间弱光识别',
    before: '逆光或弱光下特征稳定性下降，相似度波动较明显。',
    after: '经亮度均衡和对齐处理后，相似度结果更平稳，演示效果更专业。',
  },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <ElCard header="人脸识别模块状态">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-semibold">人脸识别模块状态</span>
          <ElButton type="primary" plain @click="compareVisible = true">升级前后对比</ElButton>
        </div>
      </template>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="mb-3 text-sm font-semibold">识别结果展示</div>
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem label="人员姓名">{{ identityInfo.name }}</ElDescriptionsItem>
            <ElDescriptionsItem label="识别相似度">
              {{ identityInfo.similarity }}
            </ElDescriptionsItem>
            <ElDescriptionsItem label="识别时间">{{ identityInfo.timestamp }}</ElDescriptionsItem>
            <ElDescriptionsItem label="当前状态">{{ identityInfo.status }}</ElDescriptionsItem>
          </ElDescriptions>
        </div>
        <div class="rounded-lg border border-el-border-light p-4">
          <div class="mb-3 text-sm font-semibold">模块说明</div>
          <div class="space-y-3 text-sm leading-6 text-el-text-secondary">
            <p>该页面用于静态展示识别模块与活体检测模块之间的联动关系。</p>
            <p>在实际系统中，只有活体验证通过后，识别流程才会正式触发。</p>
            <p>本 Demo 不接摄像头、不做人脸算法计算，仅模拟后台业务界面的展示效果。</p>
          </div>
        </div>
      </div>
    </ElCard>

    <ElCard header="识别联动流程">
      <ElTimeline>
        <ElTimelineItem v-for="step in recognitionSteps" :key="step" type="primary" hollow>
          {{ step }}
        </ElTimelineItem>
      </ElTimeline>
    </ElCard>

    <ElDrawer v-model="compareVisible" title="人脸识别模块升级前后对比" size="55%">
      <div class="flex flex-col gap-4">
        <ElAlert
          title="示例说明：以下内容用于静态演示“旧方案”和“升级方案”的技术与业务差异，便于汇报展示。"
          type="info"
          :closable="false"
        />

        <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div class="compare-panel before-panel">
            <div class="compare-title">升级前识别方案</div>
            <div class="compare-desc">
              以基础 2D 人脸特征比对为主，识别链路较短，依赖单次静态图像质量，面对复杂光照和伪造攻击时鲁棒性一般。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in beforeKeywords" :key="item" effect="dark" type="danger">
                {{ item }}
              </ElTag>
            </div>
          </div>
          <div class="compare-panel after-panel">
            <div class="compare-title">升级后识别方案</div>
            <div class="compare-desc">
              采用关键点对齐、质量筛选和多特征融合识别，并将识别放在活体验证之后，整体安全性和稳定性显著提升。
            </div>
            <div class="tag-group">
              <ElTag v-for="item in afterKeywords" :key="item" effect="dark" type="success">
                {{ item }}
              </ElTag>
            </div>
          </div>
        </div>

        <ElCard header="技术路线对比">
          <ElTable :data="recognitionCompareRows" border>
            <ElTableColumn prop="category" label="对比项" min-width="140" />
            <ElTableColumn prop="before" label="升级前" min-width="280" />
            <ElTableColumn prop="after" label="升级后" min-width="320" />
          </ElTable>
        </ElCard>

        <ElCard header="丰富示例场景">
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="item in recognitionExamples"
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
