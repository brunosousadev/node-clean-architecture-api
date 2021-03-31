export class InvalidParamError implements Error {
  name: string
  message: string
  stack?: string
  constructor (paramName: string) {
    this.message = `Invalid param: ${paramName}`
    this.name = 'InvalidParamError'
  }
}
