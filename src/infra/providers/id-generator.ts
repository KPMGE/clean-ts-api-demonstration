import { IdGenerator } from "../../application/providers";
import { v4 as uuid } from 'uuid'

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuid()
  }
}
