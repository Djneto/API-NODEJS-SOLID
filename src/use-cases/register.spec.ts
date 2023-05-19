import { expect, describe, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase //System Under Test

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password: '564351846541'
    })
    
    expect(user.id).toEqual(expect.any(String))

  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password: '564351846541'
    })

    const isPasswordCorrectlyHashed = await compare('564351846541', user.password_hash)
    
    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const email = 'marian@gmail.com'

    await sut.execute({
      name: 'Mariana Castro',
      email,
      password: '564351846541'
    })

    await expect(() => 
      sut.execute({
        name: 'Mariana Castro',
        email,
        password: '564351846541'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})