import { hashSync, compareSync } from 'bcrypt'

export class BcryptAdapter {
  static hashSync (data: string | Buffer, saltOrRounds: string | number): string {
    return hashSync(data, saltOrRounds)
  }

  static compareSync (data: string | Buffer, encrypted: string): boolean {
    return compareSync(data, encrypted)
  }
}
