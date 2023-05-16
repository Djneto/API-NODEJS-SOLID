import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  private usersRepository: any;

  constructor( usersRepository: any) {
    this.usersRepository = usersRepository
  }

  // constructor( private usersRepository: any) {  }

  async execute({ name, email, password}: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSmaeEmail = await prisma.user.findUnique({
      where: {
        email,
      }
    })
  
    if (userWithSmaeEmail) {
      throw new Error('E-mail already exists.')
    }
  
    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}