import { PrismaGymsRepository } from './../../repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository
  const useCase = new FetchNearbyGymUseCase(prismaGymsRepository)

  return useCase
}