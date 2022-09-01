// NOTE: sut => system under test

import { AddStudentService } from "../../src/application/services"
import { StudentMinorError } from "../../src/domain/errors"
import { AddStudentUseCase } from "../../src/domain/useCases"
import { AddStudentRepositoryMock } from "./mocks/add-student"
import { makeFakeStudentInput } from "./mocks/add-student-input"
import { EncrypterMock } from "./mocks/encrypter"
import { IdGeneratorMock } from "./mocks/id-generator"

type SutTypes = {
  sut: AddStudentService
  repoMock: AddStudentRepositoryMock
  encrypterMock: EncrypterMock
  idGeneratorMock: IdGeneratorMock
}

const makeSut = (): SutTypes => {
  const repoMock = new AddStudentRepositoryMock()
  const encrypterMock = new EncrypterMock()
  const idGeneratorMock = new IdGeneratorMock()
  const sut = new AddStudentService(repoMock, encrypterMock, idGeneratorMock)
  return {
    sut,
    repoMock,
    encrypterMock,
    idGeneratorMock
  }
}

describe('add-student-service', () => {
  it('should call repository with right data', async () => {
    const { repoMock, sut, encrypterMock } = makeSut()

    await sut.add(makeFakeStudentInput())

    expect(repoMock.input.password).toBe(encrypterMock.output)
    expect(repoMock.input.name).toBe('any_name')
    expect(repoMock.input.age).toBe(20)

  })

  it('should encrypt password before calling the repository', async () => {
    const { repoMock, encrypterMock, sut } = makeSut()

    await sut.add(makeFakeStudentInput())

    expect(repoMock.input.password).toEqual(encrypterMock.output)
  })

  it('should create an id for the student before saving it', async () => {
    const { repoMock, idGeneratorMock, sut } = makeSut()

    await sut.add(makeFakeStudentInput())

    expect(repoMock.input.id).toEqual(idGeneratorMock.output)
  })

  it('should return created student', async () => {
    const { idGeneratorMock, sut } = makeSut()

    // from request
    const { name, age } = makeFakeStudentInput()

    const expectedOutput: AddStudentUseCase.Result = {
      name,
      age,
      id: idGeneratorMock.output
    }

    const createdStudent = await sut.add(makeFakeStudentInput())

    expect(createdStudent).toEqual(expectedOutput)
  })

  it('should throw if repository throws', async () => {
    const { repoMock, sut } = makeSut()
    repoMock.add = () => { throw new Error('repo error') }

    const promise = sut.add(makeFakeStudentInput())

    await expect(promise).rejects.toThrowError(new Error('repo error'))
  })

  it('should throw StudentMinorError if student age is less than 18', async () => {
    const { sut } = makeSut()

    // student with age 10
    const fakeInput = { ...makeFakeStudentInput(), age: 10 }

    const promise = sut.add(fakeInput)

    await expect(promise).rejects.toThrowError(new StudentMinorError())
  })
})
