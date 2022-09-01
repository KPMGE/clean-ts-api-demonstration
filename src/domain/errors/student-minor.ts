export class StudentMinorError extends Error {
  constructor() {
    super('minor students not allowed!')
    this.name = 'StudentMinorError'
  }
}
