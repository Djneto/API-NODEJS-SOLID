import { test, expect, describe, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password_hash: await hash('564351846541', 6)
    })

    const { user } = await sut.execute({
      email: 'marian@gmail.com',
      password: '564351846541'
    })
    
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'marian@gmail.com',
      password: '564351846541'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should not be able to authenticate with wrong password', async () => { 
    await inMemoryUsersRepository.create({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password_hash: await hash('564351846541', 6)
    })

    expect(() => sut.execute({
      email: 'marian@gmail.com',
      password: '56435'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})