import express from 'express'
import path from 'path'

export class Server {
  private app = express()

  public start() {
    // Middlewares

    this.app.use(express.json())

    // public folder
    this.app.use(express.static('public'))

    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, '../../public/index.html')

      res.sendFile(indexPath)
    })

    this.app.listen(3000, () => {
      console.log('Server running on port 3000')
    })
  }
}
