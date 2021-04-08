import { MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'
export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate <T>(input: T): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
