import { StudentMinorError } from "../../domain/errors"
import { AddStudentUseCase } from "../../domain/useCases"
import { badRequest, ok, serverError } from "../helpers"
import { Controler, HttpResponse } from "../protocols"
import { Validator } from "../protocols/validator"

export class AddStudentController implements Controler<AddStudentUseCase.Props> {
  constructor(
    private readonly service: AddStudentUseCase,
    private readonly validator: Validator
  ) { }

  async handle(data: AddStudentUseCase.Props): Promise<HttpResponse> {
    const err = this.validator.validate(data)
    if (err) return badRequest(err)

    try {
      const addedStudent = await this.service.add(data)
      return ok(addedStudent)
    } catch (error) {
      if (error instanceof StudentMinorError) return badRequest(error)
      return serverError(error)
    }
  }
}
