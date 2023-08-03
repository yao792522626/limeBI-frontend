/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

// 判断当前用户是否为管理员
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
