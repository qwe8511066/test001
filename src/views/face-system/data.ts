export interface ComparisonRow {
  category: string;
  before: string;
  after: string;
}

export interface ModuleSummary {
  title: string;
  desc: string;
  tag: string;
}

export interface ConfigChangeRow {
  id: number;
  item: string;
  before: string;
  after: string;
  reason: string;
}

export interface TestRow {
  module: string;
  item: string;
  expected: string;
  before: string;
  after: string;
  status: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    category: '活体检测维度',
    before: '仅支持眨眼检测',
    after: '支持眨眼、摇头、嘴部开合、点头、关键点动态运动、光流防翻拍',
  },
  {
    category: '活体判定逻辑',
    before: '连续 8 帧眨眼通过即可判定活体',
    after: '任意 3 个维度达标且连续 8 帧验证成功',
  },
  {
    category: '防攻击能力',
    before: '主要抵御静态照片攻击',
    after: '可抵御静态照片、电子屏翻拍、短视频攻击',
  },
  {
    category: '界面展示',
    before: '仅显示眨眼提示',
    after: '显示多动作提示、实时得分和模式切换',
  },
  {
    category: '智能防撞报警',
    before: '与基础人脸识别协同',
    after: '核心功能不变，完成升级适配',
  },
];

export const moduleSummaries: ModuleSummary[] = [
  {
    title: '升级总览',
    desc: '展示升级目标、升级范围、版本差异和模块清单。',
    tag: '总控看板',
  },
  {
    title: '人脸识别模块',
    desc: '静态演示活体通过后才能进入识别流程的联动关系。',
    tag: '识别联动',
  },
  {
    title: '活体检测模块',
    desc: '展示眨眼、摇头、张嘴、点头、关键点和光流防翻拍能力。',
    tag: '核心功能',
  },
  {
    title: '判定逻辑模块',
    desc: '展示仅眨眼模式与多维度模式的规则差异。',
    tag: '规则引擎',
  },
  {
    title: '防攻击测试模块',
    desc: '对比照片、翻拍视频、短视频等攻击场景的测试结果。',
    tag: '安全验证',
  },
  {
    title: '防撞报警模块',
    desc: '展示报警状态、协同参数和运行稳定性说明。',
    tag: '保留模块',
  },
  {
    title: '配置变更模块',
    desc: '静态展示升级过程中的菜单、逻辑、界面与脚本配置变化。',
    tag: '变更追踪',
  },
  {
    title: '安装部署模块',
    desc: '给出当前 Vue 静态 Demo 的启动和打包步骤。',
    tag: '前端部署',
  },
  {
    title: '人员档案管理',
    desc: '模拟员工档案、人脸样本数量、状态切换以及新增编辑删除操作。',
    tag: 'CRUD',
  },
  {
    title: '活体策略管理',
    desc: '模拟不同场景下的活体策略配置、启停和规则维护。',
    tag: '策略中心',
  },
  {
    title: '验证记录查询',
    desc: '模拟按人员、部门、结果、设备进行记录筛选和查看。',
    tag: '查询中心',
  },
  {
    title: '报警事件管理',
    desc: '模拟报警工单流转、处理状态修改和删除。',
    tag: '事件流转',
  },
  {
    title: '操作说明模块',
    desc: '整理操作步骤、模式切换方式和常见问题。',
    tag: '用户手册',
  },
  {
    title: '测试报告模块',
    desc: '汇总活体、人脸识别、防撞报警和系统稳定性结果。',
    tag: '验收数据',
  },
];

export const livenessDimensions = [
  '眨眼检测',
  '摇头检测',
  '嘴部开合检测',
  '头部姿态点头检测',
  '关键点动态运动检测',
  '光流法防翻拍',
];

export const recognitionSteps = [
  '摄像头采集到人脸后进入活体检测状态',
  '活体检测满足条件后才允许进入识别流程',
  '识别成功后展示人员名称、相似度与时间戳',
  '活体失败时禁止继续识别并提示失败维度',
];

export const decisionRules = [
  {
    title: '仅眨眼模式',
    detail: '适配升级前使用习惯，连续 8 帧眨眼得分为 1 即可通过。',
  },
  {
    title: '多维度模式',
    detail: '任意 3 个维度达到阈值，同时连续 8 帧稳定通过。',
  },
  {
    title: '自动重置',
    detail: '若超时或维度不足，系统自动重置当前验证状态，支持重新开始。',
  },
];

export const antiAttackRows = [
  {
    type: '静态照片攻击',
    before: '可识别为非活体',
    after: '稳定拦截，无法通过活体检测',
  },
  {
    type: '电子屏翻拍',
    before: '存在误通过风险',
    after: '通过光流特征识别翻拍行为并拦截',
  },
  {
    type: '短视频攻击',
    before: '防御能力弱',
    after: '通过多维度动作校验识别异常并拦截',
  },
];

export const configChangeRows: ConfigChangeRow[] = [
  {
    id: 1,
    item: '人脸识别模块版本升级',
    before: 'V1.0 仅支持基础人脸匹配和眨眼联动',
    after: 'V2.0 支持多维度活体接口与识别联动',
    reason: '适配新增活体检测能力',
  },
  {
    id: 2,
    item: '新增活体检测设置菜单',
    before: '无独立设置项',
    after: '支持开关、灵敏度、检测维度选择',
    reason: '提升配置灵活性',
  },
  {
    id: 3,
    item: '识别界面配置升级',
    before: '仅有眨眼动作提示',
    after: '增加多动作提示、实时得分、模式切换',
    reason: '提升交互体验和可视化程度',
  },
  {
    id: 4,
    item: '判定逻辑配置升级',
    before: '连续 8 帧眨眼通过',
    after: '任意 3 个维度 + 连续 8 帧通过',
    reason: '增强安全性与准确率',
  },
  {
    id: 5,
    item: '测试脚本配置更新',
    before: '仅验证眨眼检测与防撞报警',
    after: '补充摇头、张嘴、防翻拍等测试项',
    reason: '保证升级后的覆盖面完整',
  },
];

export const faqRows = [
  {
    question: '活体检测准确率低怎么办？',
    answer: '检查光线条件、动作幅度，并优先使用多维度模式进行演示。',
  },
  {
    question: '摇头动作无法检测怎么办？',
    answer: '保持头部处于采集框中央，并适当增大左右摇头幅度。',
  },
  {
    question: '运行卡顿怎么办？',
    answer: '静态 Demo 仅展示页面，无真实算法计算，可直接刷新页面重试。',
  },
  {
    question: '如何部署当前版本？',
    answer: '执行 pnpm dev 启动本地演示，执行 pnpm build 生成静态资源。',
  },
];

export const testRows: TestRow[] = [
  {
    module: '活体检测模块',
    item: '眨眼动作检测',
    expected: '真实人脸可通过，照片和视频不可通过',
    before: '通过',
    after: '通过',
    status: '通过',
  },
  {
    module: '活体检测模块',
    item: '摇头动作检测',
    expected: '真实人脸摇头可通过，照片和视频不可通过',
    before: '无此功能',
    after: '通过',
    status: '通过',
  },
  {
    module: '活体检测模块',
    item: '嘴部开合检测',
    expected: '真实人脸嘴部开合可通过',
    before: '无此功能',
    after: '通过',
    status: '通过',
  },
  {
    module: '活体检测模块',
    item: '防翻拍准确率',
    expected: '准确率不低于 99%',
    before: '翻拍视频存在误通过',
    after: '100%',
    status: '通过',
  },
  {
    module: '人脸识别模块',
    item: '与活体检测衔接',
    expected: '未通过活体前不可进入识别流程',
    before: '通过',
    after: '通过',
    status: '通过',
  },
  {
    module: '智能防撞报警模块',
    item: '功能正常性',
    expected: '报警、记录和联动均正常',
    before: '通过',
    after: '通过',
    status: '通过',
  },
  {
    module: '系统整体',
    item: '48 小时稳定性',
    expected: '无卡顿、无崩溃、无冲突',
    before: '通过',
    after: '通过',
    status: '通过',
  },
];

export const demoCommands = ['pnpm install', 'pnpm dev', 'pnpm build'];
