import { Encrypter } from "../../../src/application/providers"

export class EncrypterMock implements Encrypter {
  input = ""
  output = "encrypter output"

  encrypt(plainText: string): string {
    this.input = plainText
    return this.output
  }
}
