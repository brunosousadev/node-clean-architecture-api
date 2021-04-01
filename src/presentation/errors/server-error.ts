export class ServerError implements Error {
  name: string
  message: string
  stack?: string
  constructor () {
    this.message = 'nternal server error'
    this.name = 'InvalidParamError'
  }
}
