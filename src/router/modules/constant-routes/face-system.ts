import { LAYOUT_COMPONENT, ROUTE_NAMES } from '@/shared';

const faceSystemRoutes: CustomRouteRecordRaw = {
  path: '/face-system',
  redirect: '/face-system/overview',
  component: LAYOUT_COMPONENT,
  name: ROUTE_NAMES.FACE_SYSTEM,
  meta: {
    title: '快速活体检测系统',
    sort: 2,
    menuIcon: 'ri:scan-face-line',
  },
  children: [
    {
      path: 'overview',
      name: ROUTE_NAMES.FACE_SYSTEM_OVERVIEW,
      component: () => import('@/views/face-system/overview.vue'),
      meta: {
        title: '升级总览',
        menuIcon: 'ri:apps-2-line',
      },
    },
    {
      path: 'recognition',
      name: ROUTE_NAMES.FACE_SYSTEM_RECOGNITION,
      component: () => import('@/views/face-system/recognition.vue'),
      meta: {
        title: '人脸识别模块',
        menuIcon: 'ri:user-search-line',
      },
    },
    {
      path: 'liveness',
      name: ROUTE_NAMES.FACE_SYSTEM_LIVENESS,
      component: () => import('@/views/face-system/liveness.vue'),
      meta: {
        title: '活体检测模块',
        menuIcon: 'ri:radar-line',
      },
    },
    {
      path: 'decision',
      name: ROUTE_NAMES.FACE_SYSTEM_DECISION,
      component: () => import('@/views/face-system/decision.vue'),
      meta: {
        title: '判定逻辑模块',
        menuIcon: 'ri:git-branch-line',
      },
    },
    {
      path: 'anti-attack',
      name: ROUTE_NAMES.FACE_SYSTEM_ANTI_ATTACK,
      component: () => import('@/views/face-system/anti-attack.vue'),
      meta: {
        title: '防攻击测试模块',
        menuIcon: 'ri:shield-check-line',
      },
    },
    {
      path: 'collision-alarm',
      name: ROUTE_NAMES.FACE_SYSTEM_COLLISION,
      component: () => import('@/views/face-system/collision-alarm.vue'),
      meta: {
        title: '防撞报警模块',
        menuIcon: 'ri:alarm-warning-line',
      },
    },
    {
      path: 'config-change',
      name: ROUTE_NAMES.FACE_SYSTEM_CONFIG,
      component: () => import('@/views/face-system/config-change.vue'),
      meta: {
        title: '配置变更模块',
        menuIcon: 'ri:settings-3-line',
      },
    },
    {
      path: 'deploy-guide',
      name: ROUTE_NAMES.FACE_SYSTEM_DEPLOY,
      component: () => import('@/views/face-system/deploy-guide.vue'),
      meta: {
        title: '安装部署模块',
        menuIcon: 'ri:rocket-line',
      },
    },
    {
      path: 'personnel',
      name: ROUTE_NAMES.FACE_SYSTEM_PERSONNEL,
      component: () => import('@/views/face-system/personnel.vue'),
      meta: {
        title: '人员档案管理',
        menuIcon: 'ri:team-line',
      },
    },
    {
      path: 'strategy',
      name: ROUTE_NAMES.FACE_SYSTEM_STRATEGY,
      component: () => import('@/views/face-system/strategy.vue'),
      meta: {
        title: '活体策略管理',
        menuIcon: 'ri:sliders-line',
      },
    },
    {
      path: 'records',
      name: ROUTE_NAMES.FACE_SYSTEM_RECORDS,
      component: () => import('@/views/face-system/records.vue'),
      meta: {
        title: '验证记录查询',
        menuIcon: 'ri:history-line',
      },
    },
    {
      path: 'alarms',
      name: ROUTE_NAMES.FACE_SYSTEM_ALARMS,
      component: () => import('@/views/face-system/alarms.vue'),
      meta: {
        title: '报警事件管理',
        menuIcon: 'ri:notification-3-line',
      },
    },
    {
      path: 'operation-manual',
      name: ROUTE_NAMES.FACE_SYSTEM_OPERATION,
      component: () => import('@/views/face-system/operation-manual.vue'),
      meta: {
        title: '操作说明模块',
        menuIcon: 'ri:file-list-3-line',
      },
    },
    {
      path: 'test-report',
      name: ROUTE_NAMES.FACE_SYSTEM_REPORT,
      component: () => import('@/views/face-system/test-report.vue'),
      meta: {
        title: '测试报告模块',
        menuIcon: 'ri:bar-chart-box-line',
      },
    },
  ],
};

export default faceSystemRoutes;
