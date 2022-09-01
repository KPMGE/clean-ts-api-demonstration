import { Validator } from "../../../presentation/protocols/validator";
import { RequiredFieldValidator, ValidationComposite } from "../../../validation";

export const makeAddStudentValidation = (): Validator => {
  let validators = []

  validators.push(new RequiredFieldValidator('name'))
  validators.push(new RequiredFieldValidator('age'))
  validators.push(new RequiredFieldValidator('password'))

  const composite = new ValidationComposite(validators)
  return composite
}

