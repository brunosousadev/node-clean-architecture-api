import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompareName')
}
describe('CompareFields Validation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompareName: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompareName'))
  })
  test('Should not return  if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompareName: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
