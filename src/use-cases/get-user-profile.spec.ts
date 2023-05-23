import { expect, describe, it, beforeEach} from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'Mariana Castro',
      email: 'marian@gmail.com',
      password_hash: await hash('564351846541', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    
    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Mariana Castro')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() => sut.execute({
      userId: 'non-existing-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

})