import { AddStudentRepository } from "../../../src/application/repositories"
import { Student } from "../../../src/domain/entities"

export class AddStudentRepositoryMock implements AddStudentRepository {
  input = null
  async add(student: Student): Promise<Student> {
    this.input = student
    return null
  }
}
