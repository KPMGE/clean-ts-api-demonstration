import { MissingFieldError } from "../presentation/errors";
import { Validator } from "../presentation/protocols/validator";

export class RequiredFieldValidator implements Validator {
  constructor(private readonly fieldName: string) { }

  validate(input: any): Error {
    if (!input[this.fieldName]) return new MissingFieldError(this.fieldName)
    return null
  }
}
