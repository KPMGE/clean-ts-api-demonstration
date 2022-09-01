import { AddStudentRepository } from "../../../application/repositories";
import { Student } from "../../../domain/entities";

let students: Student[] = []

export class InMemoryStudentRepository implements AddStudentRepository {
  async add(student: Student): Promise<Student> {
    console.log('Received student: ', student)
    students.push(student)
    return student
  }
}
