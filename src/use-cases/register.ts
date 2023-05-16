import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  // private usersRepository: any;

  // constructor( usersRepository: UsersRepository) {
  //   this.usersRepository = usersRepository
  // }

  constructor( private usersRepository: UsersRepository) {  }

  async execute({ name, email, password}: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    
    const userWithSmaeEmail = await this.usersRepository.findByEmail(email)

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