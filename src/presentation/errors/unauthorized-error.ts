export class UnauthorizedError implements Error {
  name: string
  message: string
  stack?: string
  constructor () {
    this.message = 'Unauthorized'
    this.name = 'UnauthorizedError'
  }
}
