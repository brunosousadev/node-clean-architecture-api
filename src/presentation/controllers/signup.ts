import { HttpRequest, HttpResponse } from '../protocols/http'
import { EmailValidator } from '../protocols/email-validator'
import { Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'
import { badRequest, serverError } from '../helpers/http/http-helper'
export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return { statusCode: 200, body: {} }
    } catch (error) {
      return serverError()
    }
  }
}
