import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // private usersRepository: any;

  // constructor( usersRepository: UsersRepository) {
  //   this.usersRepository = usersRepository
  // }

  constructor( private usersRepository: UsersRepository) {  }

  async execute({ 
    name, 
    email, 
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    
    const userWithSmaeEmail = await this.usersRepository.findByEmail(email)

    if (userWithSmaeEmail) {
      throw new UserAlreadyExistsError()
    }
  
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })

    return {user}
  }
}