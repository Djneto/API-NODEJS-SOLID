import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymUseCase } from './fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase //System Under Test

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672
    })

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.6481091
    })
    
    const { gyms } = await sut.execute({
      userLatitude: -27.0747279,
      userLongitude: -49.4889672
    })
    
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' })
    ])

  })
})