import fs from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {
  // Add a logger like morgan here
  console.log(req.url)

  switch (req.url) {
    case '/':
      const htmlBody = fs.readFileSync('./public/index.html', 'utf-8')

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(htmlBody)
      break

    case '/css/styles.css':
      const cssBody = fs.readFileSync('./public/css/styles.css', 'utf-8')
      res.writeHead(200, { 'Content-Type': 'text/css' })
      res.end(cssBody)
      break

    case '/js/app.js':
      const jsBody = fs.readFileSync('./public/js/app.js', 'utf-8')
      res.writeHead(200, { 'Content-Type': 'application/javascript' })
      res.end(jsBody)
      break

    case '/favicon.ico':
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end()
      break

    case '/api':
      const data = {
        name: 'John Doe',
        age: 30,
        city: 'New York',
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
      break

    default:
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
      break
  }
})

const PORT = 8000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
