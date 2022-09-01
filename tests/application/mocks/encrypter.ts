import { Encrypter } from "../../../src/application/providers"

export class EncrypterMock implements Encrypter {
  input = ""
  output = "encrypter output"

  async encrypt(plainText: string): Promise<string> {
    this.input = plainText
    return this.output
  }
}
