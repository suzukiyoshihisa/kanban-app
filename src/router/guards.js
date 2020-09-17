import store from '../store'

export const authorizeToken = (to, from, next) => {
  if (to.match.some(record => record.meta.requiresAuth)) {
    // マッチしたルートにおいて、メタフィールドに`requiresAuth`が付与されている場合は
    // ログインした際に付与される認証トークンがあるかどうかをチェックする
    // 注意：
    // このアプリケーションでは簡略化のため`auth_token`があるかどうかのみで
    // ログイン済みであるかチェックしているが、
    // 本来ならば付与された認証トークンをバックエンドのAPI経由などで検証すべき
    if (!store.state.auth || store.state.auth.token) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
}
