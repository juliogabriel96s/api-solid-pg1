import { GetuserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"

export function makeGetUseMetricsUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new GetuserMetricsUseCase(checkInsRepository)

    return useCase
}