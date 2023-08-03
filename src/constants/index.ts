/**
 * @author
 * CreateTime 2023/5/7 15:24
 * 全局变量
 */

/**
 * 项目logo
 */
import loginImage from '../../public/loginImage.jpg';
import logo from '../../public/logo.svg';
import registerImage from '../../public/registerImage.jpg';

export const IMAGES = [
  import('../../public/catImage/image1.jpg'),
  import('../../public/catImage/image2.jpg'),
  import('../../public/catImage/image3.jpg'),
  import('../../public/catImage/image4.jpg'),
  import('../../public/catImage/image5.jpg'),
  import('../../public/catImage/image6.jpg'),
  import('../../public/catImage/1.jpg'),
  import('../../public/catImage/2.jpg'),
  import('../../public/catImage/3.jpg'),
  import('../../public/catImage/4.jpg'),
  import('../../public/catImage/5.jpg'),
  import('../../public/catImage/6.jpg'),
  import('../../public/catImage/7.jpg'),
  import('../../public/catImage/8.jpg'),
  import('../../public/catImage/9.jpg'),
  import('../../public/catImage/10.jpg'),
];

export const SYSTEM_LOGO = logo;

export const LOGIN_BACKGROUND_IMAGE = loginImage;

export const REGISTER_BACKGROUND_IMAGE = registerImage;

/**
 * shier介绍
 */
export const WELCOME = 'https://github.com/yao792522626';

export const GitHub_LINK = 'https://github.com/yao792522626';

export const CHART_TYPE_SELECT = [
  { value: '折线图', label: '折线图' },
  { value: '柱状图', label: '柱状图' },
  { value: '雷达图', label: '雷达图' },
  { value: '条形图', label: '条形图' },
  { value: '散点图', label: '散点图' },
  { value: '正负条形图', label: '正负条形图' },
  { value: '柱状图框选', label: '柱状图框选' },
  {
    value: 'divider',
    label: '-----------------------多列数据建议选择如下的图表类型-----------------------',
    disabled: true,
  },
  { value: '饼图', label: '饼图' },
  { value: '树图', label: '树图' },
  { value: '热力图', label: '热力图' },
  { value: '漏斗图', label: '漏斗图' },
  { value: '区域图', label: '区域图' },
  { value: '堆叠条形图', label: '堆叠条形图' },
  { value: '玫瑰图', label: '玫瑰图' },
];

/**
 * 默认头像
 */
export const DEFAULT_AVATAR_URL =
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56d6f5ad1d8747f484d6c2666b5a7961~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?';

export const selectGender = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
];
export const selectUserStatus = [
  { value: 0, label: '正常' },
  { value: 1, label: '注销' },
];
export const selectUserRole = [
  { value: 'user', label: '普通用户' },
  { value: 'admin', label: '管理员' },
  { value: 'ban', label: '封号' },
];
export const selectAvatarUrl = [
  {
    value: 'https://yupi.icu//logo.png',
    label: '默认头像',
  },
  {
    value:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0ac3a25d89442f880b5c34c58d075e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp',
    label: '搞笑头像',
  },
  {
    value:
      'https://ts1.cn.mm.bing.net/th?id=OIP-C.jPAdOeN1Z3hyeR9EnQghBAHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    label: '男生头像',
  },
  {
    value:
      'https://ts1.cn.mm.bing.net/th?id=OIP-C.jPAdOeN1Z3hyeR9EnQghBAHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    label: '御姐1号',
  },
  {
    value:
      'https://ts1.cn.mm.bing.net/th?id=OIP-C.lgs9Nx7Ur4eIwfxKjIiZMwHaKk&w=209&h=298&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
    label: '小姐姐2号',
  },
  {
    value:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e5f5893a1544dfabd6094b1a25b12fa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?',
    label: '小姐姐3号',
  },
  {
    value:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c970503d7a94863b5951c123b82b19d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?',
    label: '小姐姐4号',
  },
  {
    value:
      'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/8/17157fe88025c70d~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image',
    label: '小姐姐5号',
  },
  {
    value:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/990c553af0ad438d915ba06517536fdd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp',
    label: '小姐姐6号',
  },
  {
    value:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/990c553af0ad438d915ba06517536fdd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp',
    label: '小姐姐7号',
  },
];
