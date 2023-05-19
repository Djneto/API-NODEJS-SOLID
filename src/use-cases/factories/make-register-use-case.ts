import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUseCase() {
  const prsimaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prsimaUsersRepository)

  return registerUseCase
}