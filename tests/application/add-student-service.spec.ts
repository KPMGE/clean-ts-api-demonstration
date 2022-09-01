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

describe('add-student-service', () => {
  it('should call repository with right data', async () => {
    const repo = new AddStudentRepositoryMock()
    const sut = new AddStudentService(repo)

    const fakeStudent: Student = {
      id: 'any_id',
      age: 20,
      name: 'any_name',
      password: 'any_password'
    }

    await sut.add(fakeStudent)
    expect(repo.input).toEqual(fakeStudent)
  })
})
