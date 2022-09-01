import { Validator } from "../presentation/protocols/validator";

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) { }
  validate(input: any): Error {
    for (const validator of this.validators) {
      const err = validator.validate(input)
      if (err) return err
    }
    return null
  }
}
