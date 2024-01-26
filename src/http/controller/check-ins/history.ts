import {z} from 'zod'
import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchUseCheckInHistoryUseCase } from '@/use-cases/factores/make-fetch-use-check-in-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply){
    const checkInHistoryQuerySchema = z.object({
       page: z.coerce.number().min(1).default(1)
    })
    
    const { page} = checkInHistoryQuerySchema.parse(request.query)

         const fetchUseCheckInHistoryUseCase = makeFetchUseCheckInHistoryUseCase()
      const {checkIn} =  await fetchUseCheckInHistoryUseCase.execute({
        userId: request.user.sub,
           page
        })
    
    return reply.status(200).send({
        checkIn
    })
    
    }