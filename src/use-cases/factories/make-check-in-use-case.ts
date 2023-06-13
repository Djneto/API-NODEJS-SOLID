import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckinUseCase } from "../check-in"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckinUseCase(prismaCheckInsRepository, prismaGymsRepository)

  return useCase
}