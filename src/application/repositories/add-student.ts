import { Student } from "../../domain/entities"

export interface AddStudentRepository {
  add(student: Student): Promise<Student>
}
