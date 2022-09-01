import { Student } from "../../domain/entities"
import { StudentMinorError } from "../../domain/errors"
import { AddStudentUseCase } from "../../domain/useCases"
import { Encrypter, IdGenerator } from "../providers"
import { AddStudentRepository } from "../repositories"

export class AddStudentService implements AddStudentUseCase {
  constructor(
    private readonly addStudentRepo: AddStudentRepository,
    private readonly encrypter: Encrypter,
    private readonly idGenerator: IdGenerator
  ) { }

  async add(student: AddStudentUseCase.Props): Promise<AddStudentUseCase.Result> {
    if (student.age < 18) throw new StudentMinorError()

    const encryptedPassword = await this.encrypter.encrypt(student.password)

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
