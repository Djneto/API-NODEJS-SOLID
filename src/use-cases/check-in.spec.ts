import { expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase //System Under Test

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(inMemoryCheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    
    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })
    
    await expect(() => sut.execute({
        gymId: 'gym-01',
        userId: 'user-01'
      })
    ).rejects.toBeInstanceOf(Error)

  })

  it('should be able to check twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })
})