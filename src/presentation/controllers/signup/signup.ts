import { Controller, HttpRequest, AddAccount, HttpResponse, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { AccountModel } from '../../../domain/models/account'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok<AccountModel>(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
