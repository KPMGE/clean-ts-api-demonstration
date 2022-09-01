import { Student } from "../entities"

export interface AddStudentUseCase {
  add(student: AddStudentUseCase.Props): Promise<AddStudentUseCase.Result>
}

export namespace AddStudentUseCase {
  export type Props = Omit<Student, 'id'>
  export type Result = Omit<Student, 'password'>
}
