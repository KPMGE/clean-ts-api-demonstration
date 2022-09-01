import { hash } from "bcryptjs";
import { Encrypter } from "../../application/providers";


export class BcryptEncrypter implements Encrypter {
  async encrypt(plainText: string): Promise<string> {
    const hashed = await hash(plainText, 8)
    return hashed
  }
} 
