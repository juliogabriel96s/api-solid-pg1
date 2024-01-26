import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { CheckInsUseCase } from "../check-in"

export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CheckInsUseCase(checkInsRepository, gymsRepository)

    return useCase
}