
import { InvalidParamError } from '../../errors'
import { Validation } from './validation'
export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}
  validate <T>(input: T): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
