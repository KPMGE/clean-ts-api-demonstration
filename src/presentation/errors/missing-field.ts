export class MissingFieldError extends Error {
  constructor(field: string) {
    super(`Missing field: ${field}`)
    this.name = 'MissingFieldError'
  }
}
