import { expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase //System Under Test

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(inMemoryCheckInsRepository, inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -15.4533562,
      longitude: -47.609993
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.4533562,
      userLongitude: -47.609993
    })
    
    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.4533562,
      userLongitude: -47.609993
    })
    
    await expect(() => sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -15.4533562,
        userLongitude: -47.609993
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)

  })

  it('should be able to check twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.4533562,
      userLongitude: -47.609993
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -15.4533562,
      userLongitude: -47.609993
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check in on distant gym', async () => {
    inMemoryGymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672)
    })
    
    await expect(() => sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)

  })
})