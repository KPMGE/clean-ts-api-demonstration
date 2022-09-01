import { AddStudentUseCase } from "../../../src/domain/useCases"

export class AddStudentServiceMock implements AddStudentUseCase {
  output: AddStudentUseCase.Result = {
    name: 'any_name',
    age: 20,
    id: 'any_id'
  }
  async add(student: AddStudentUseCase.Props): Promise<AddStudentUseCase.Result> {
    return this.output
  }
}
