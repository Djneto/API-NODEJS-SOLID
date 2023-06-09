import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}