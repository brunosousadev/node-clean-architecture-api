import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should enale CORS', async () => {
    app.get('/test-body-cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test-body-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
