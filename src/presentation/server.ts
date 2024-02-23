import express from 'express'
import path from 'path'

interface Options {
  publicPath: string
  port: number
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath?: string

  constructor(options: Options) {
    const { port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
  }

  public start() {
    // Middlewares

    // public folder
    this.app.use(express.static(this.publicPath!))

    // API Routes
    this.app.get('/api/todos', (req, res) => {
      return res.json({
        ok: true,
        todos: [
          { id: 1, text: 'some task todo 1', createdAt: new Date() },
          { id: 2, text: 'some task todo 2', createdAt: null },
          { id: 3, text: 'some task todo 3', createdAt: new Date() },
        ],
      })
    })

    // need for SPA routes
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)

      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
