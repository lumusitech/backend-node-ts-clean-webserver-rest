import { envs } from '../src/config/envs'
import { Server } from '../src/presentation/server'

jest.mock('../src/presentation/server')

describe('App', () => {
  it('should call the server with options', async () => {
    await import('../src/app')

    expect(Server).toHaveBeenCalledTimes(1)
    expect(Server).toHaveBeenCalledWith({
      port: 3001,
      publicPath: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    })

    expect(Server.prototype.start).toHaveBeenCalled()
  })
})
