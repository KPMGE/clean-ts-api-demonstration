// sut => system under test

type Student = {
  id: string
  name: string
  age: number
  password: string
}

interface AddStudentUseCase {
  add(student: Student): Promise<Student>
}

interface AddStudentRepository {
  add(student: Student): Promise<Student>
}

class AddStudentRepositoryMock implements AddStudentRepository {
  input = null
  async add(student: Student): Promise<Student> {
    this.input = student
    return null
  }
}

class AddStudentService implements AddStudentUseCase {
  constructor(private readonly addStudentRepo: AddStudentRepository) { }

  async add(student: Student): Promise<Student> {
    await this.addStudentRepo.add(student)
    return null
  }
}

type SutTypes = {
  sut: AddStudentService
  repoMock: AddStudentRepositoryMock
}

const makeSut = (): SutTypes => {
  const repoMock = new AddStudentRepositoryMock()
  const sut = new AddStudentService(repoMock)
  return {
    sut,
    repoMock
  }
}

const makeFakeStudent = (): Student => ({
  id: 'any_id',
  age: 20,
  name: 'any_name',
  password: 'any_password'
})

describe('add-student-service', () => {
  it('should call repository with right data', async () => {
    const { repoMock, sut } = makeSut()

    await sut.add(makeFakeStudent())

    expect(repoMock.input).toEqual(makeFakeStudent())
  })
})
