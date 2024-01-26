import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymsUseCase } from "../create-gyms"

export function makeCreateGymUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymsUseCase(gymsRepository)

    return useCase
}