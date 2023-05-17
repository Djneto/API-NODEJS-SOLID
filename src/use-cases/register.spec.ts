import { test, expect, describe, it} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password: '564351846541'
    })
    
    expect(user.id).toEqual(expect.any(String))

  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password: '564351846541'
    })

    const isPasswordCorrectlyHashed = await compare('564351846541', user.password_hash)
    
    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'marian@gmail.com'

    await registerUseCase.execute({
      name: 'Mariana Castro',
      email,
      password: '564351846541'
    })

    expect(() => 
      registerUseCase.execute({
        name: 'Mariana Castro',
        email,
        password: '564351846541'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

  })
})