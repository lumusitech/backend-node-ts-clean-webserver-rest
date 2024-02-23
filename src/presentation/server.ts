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

    this.app.use(express.json())

    // public folder
    this.app.use(express.static(this.publicPath!))

    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)

      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
