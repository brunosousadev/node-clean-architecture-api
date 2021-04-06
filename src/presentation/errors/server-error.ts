export class ServerError implements Error {
  name: string
  message: string
  stack?: string
  constructor (stack: string) {
    this.message = 'nternal server error'
    this.name = 'InvalidParamError'
    this.stack = stack
  }
}
