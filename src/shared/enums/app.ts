import type { ValueOf } from '#/common';

/**
 * 通用状态枚举
 */
export const STATUS_ENUM = {
  ENABLE: 1,
  CLOSE: 0,
} as const;

/** 状态枚举值联合类型 */
export type StatusEnumValue = ValueOf<typeof STATUS_ENUM>;

/**
 * 性别枚举
 */
export const GENDER_ENUM = {
  MALE: 1,
  FEMALE: 0,
} as const;

/** 性别枚举值联合类型 */
export type GenderEnumValue = ValueOf<typeof GENDER_ENUM>;

/**
 * 表单模式枚举
 */
export const FORM_TYPE_ENUM = {
  ADD: 'add',
  EDIT: 'edit',
  DETAIL: 'detail',
} as const;

/** 表单模式枚举值联合类型 */
export type FormTypeEnumValue = ValueOf<typeof FORM_TYPE_ENUM>;

/**
 * 树结构表单枚举
 */
export const TREE_FORM_TYPE_ENUM = {
  ...FORM_TYPE_ENUM,
  ADD_CHILD: 'addChild',
} as const;

/** 树结构表单枚举值联合类型 */
export type TreeFormTypeEnumValue = ValueOf<typeof TREE_FORM_TYPE_ENUM>;

/**
 * 排序方式枚举
 */
export const SORT_MODE_ENUM = {
  DESC: 'desc',
  ASC: 'asc',
} as const;

/** 排序方式枚举值联合类型。 */
export type SortModeEnumValue = ValueOf<typeof SORT_MODE_ENUM>;

/**
 * 权限路由类型枚举
 */
export const PERMISSION_ROUTE_TYPE_ENUM = {
  DIR: 'dir',
  MENU: 'menu',
  ACTION: 'action',
  LINK: 'link',
} as const;

/** 权限路由类型枚举值联合类型 */
export type PermissionRouteTypeEnumValue = ValueOf<typeof PERMISSION_ROUTE_TYPE_ENUM>;

/** 路由名称 */
export const ROUTE_NAMES = {
  /** 根路径 */
  ROOT: 'Root',
  /** 仪表盘 */
  DASHBOARD: 'Dashboard',
  /** 数据分析 */
  ANALYTICS: 'Analytics',
  /** 错误页 */
  ERROR_PAGES: 'ErrorPages',
  /** 404 */
  NOT_FOUND: 'NotFound',
  /** 403 */
  FORBIDDEN: 'Forbidden',
  /** 500 */
  SERVICE_ERROR: 'ServiceError',
  /** 关于 */
  ABOUT: 'About',
  /** 关于项目 */
  ABOUT_PROJECT: 'AboutProject',

  /** 快速活体检测系统 */
  FACE_SYSTEM: 'FaceSystem',
  /** 系统总览 */
  FACE_SYSTEM_OVERVIEW: 'FaceSystemOverview',
  /** 人脸识别模块 */
  FACE_SYSTEM_RECOGNITION: 'FaceSystemRecognition',
  /** 活体检测模块 */
  FACE_SYSTEM_LIVENESS: 'FaceSystemLiveness',
  /** 活体判定逻辑 */
  FACE_SYSTEM_DECISION: 'FaceSystemDecision',
  /** 防攻击测试模块 */
  FACE_SYSTEM_ANTI_ATTACK: 'FaceSystemAntiAttack',
  /** 智能防撞报警模块 */
  FACE_SYSTEM_COLLISION: 'FaceSystemCollision',
  /** 配置变更模块 */
  FACE_SYSTEM_CONFIG: 'FaceSystemConfig',
  /** 安装部署模块 */
  FACE_SYSTEM_DEPLOY: 'FaceSystemDeploy',
  /** 操作说明模块 */
  FACE_SYSTEM_OPERATION: 'FaceSystemOperation',
  /** 测试报告模块 */
  FACE_SYSTEM_REPORT: 'FaceSystemReport',
  /** 人员档案管理 */
  FACE_SYSTEM_PERSONNEL: 'FaceSystemPersonnel',
  /** 活体策略管理 */
  FACE_SYSTEM_STRATEGY: 'FaceSystemStrategy',
  /** 验证记录查询 */
  FACE_SYSTEM_RECORDS: 'FaceSystemRecords',
  /** 报警事件管理 */
  FACE_SYSTEM_ALARMS: 'FaceSystemAlarms',

  /** 示例 */
  EXAMPLES: 'Examples',
  /** 示例 Element Plus */
  ELEMENT_PLUS: 'ElementPlus',

  /** 登录 */
  AUTH: 'Auth',
  /** 账号登录 */
  ACCOUNT_LOGIN: 'AccountLogin',
  /** 短信登录 */
  SMS_LOGIN: 'SmsLogin',
  /** 扫码登录 */
  QR_LOGIN: 'QrLogin',
  /** 忘记密码 */
  FORGOT_PASSWORD: 'ForgotPassword',
  /** 注册 */
  REGISTER: 'Register',
} as const;

export type RouteNames = ValueOf<typeof ROUTE_NAMES>;
