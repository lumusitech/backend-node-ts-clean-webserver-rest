import express, { Router } from 'express'
import path from 'path'

interface Options {
  routes: Router
  publicPath: string
  port: number
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath?: string
  private readonly routes: Router

  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
    this.routes = routes
  }

  public start() {
    // Middlewares

    // public folder
    this.app.use(express.static(this.publicPath!))

    // API Routes
    this.app.use(this.routes)

    // need for SPA routes
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)

      return res.sendFile(indexPath)
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
