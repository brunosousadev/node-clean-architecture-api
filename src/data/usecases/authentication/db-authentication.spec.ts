import { AccountModel } from '../add-account/db-add-account-protocols'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashCompare } from '../../protocols/criptography/hash-compare'
import { TokenGenerator } from '../../protocols/criptography/token-generator'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({ email: 'any_email@mail.com', password: 'any_password' })

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashCompare
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, tokenGeneratorStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
  }
}
describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should return nulls if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accassToken = await sut.auth(makeFakeAuthentication())
    expect(accassToken).toBeNull()
  })
  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should return nulls if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accassToken = await sut.auth(makeFakeAuthentication())
    expect(accassToken).toBeNull()
  })
  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
