import request from 'supertest'
import app from '../config/app'
interface BodyTypes {
  name: string
}
describe('Body Parser Middleware', () => {
  const makeBody = (): BodyTypes => ({ name: 'Bruno' })

  test('Should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send(makeBody())
      .expect(makeBody())
  })
})