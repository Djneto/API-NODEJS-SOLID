import { test, expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'


describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email){
        return null
      },
      async create(data) {
        return {
          id: 'user-1',
          nome: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password: '564351846541'
    })

    const isPasswordCorrectlyHashed = await compare('564351846541', user.password_hash)
    
    expect(isPasswordCorrectlyHashed).toBe(true)

  })
})