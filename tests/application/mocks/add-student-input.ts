import { AddStudentUseCase } from "../../../src/domain/useCases";

export const makeFakeStudentInput = (): AddStudentUseCase.Props => ({
  age: 20,
  name: 'any_name',
  password: 'any_password'
})
