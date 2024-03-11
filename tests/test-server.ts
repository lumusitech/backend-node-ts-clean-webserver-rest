import { envs } from '../src/config/envs'
import { AppRouter } from '../src/presentation/routes'
import { Server } from '../src/presentation/server'

export const testServer = new Server({
  port: envs.PORT,
  publicPath: envs.PUBLIC_PATH,
  routes: AppRouter.routes,
})
