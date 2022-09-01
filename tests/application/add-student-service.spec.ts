// sut => system under test

type Student = {
  id: string
  name: string
  age: number
  password: string
}

// type AddStudentInputDTO = {
//   name: string
//   age: number
//   password: string
// }

// type AddStudentInputDTO = Omit<Student, 'id'>

interface AddStudentUseCase {
  add(student: AddStudentUseCase.Props): Promise<AddStudentUseCase.Result>
}

export namespace AddStudentUseCase {
  export type Props = Omit<Student, 'id'>
  export type Result = Omit<Student, 'password'>
}

interface AddStudentRepository {
  add(student: Student): Promise<Student>
}

interface IdGenerator {
  generate(): string
}

interface Encrypter {
  encrypt(plainText: string): string
}


class EncrypterMock implements Encrypter {
  input = ""
  output = "encrypter output"

  encrypt(plainText: string): string {
    this.input = plainText
    return this.output
  }
}

class IdGeneratorMock implements IdGenerator {
  output = "id_generetor_out"
  generate(): string {
    return this.output
  }
}

class AddStudentRepositoryMock implements AddStudentRepository {
  input = null
  async add(student: Student): Promise<Student> {
    this.input = student
    return null
  }
}

class AddStudentService implements AddStudentUseCase {
  constructor(
    private readonly addStudentRepo: AddStudentRepository,
    private readonly encrypter: Encrypter,
    private readonly idGenerator: IdGenerator
  ) { }

  async add(student: AddStudentUseCase.Props): Promise<AddStudentUseCase.Result> {
    if (student.age < 18) throw new StudentMinorError()

    const encryptedPassword = this.encrypter.encrypt(student.password)

    const newStudent: Student = {
      ...student,
      id: this.idGenerator.generate(),
      password: encryptedPassword
    }

    await this.addStudentRepo.add(newStudent)
    return {
      id: newStudent.id,
      age: newStudent.age,
      name: newStudent.name
    }
  }
}

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

const makeFakeStudentInput = (): AddStudentUseCase.Props => ({
  age: 20,
  name: 'any_name',
  password: 'any_password'
})

class StudentMinorError extends Error {
  constructor() {
    super('minor students not allowed!')
    this.name = 'StudentMinorError'
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
