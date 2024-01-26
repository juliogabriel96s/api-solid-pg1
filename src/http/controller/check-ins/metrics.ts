import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetUseMetricsUseCase } from '@/use-cases/factores/make-get-use-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply){
  

         const getUseMetricUseCase = makeGetUseMetricsUseCase()
      const {checkInsCount} =  await getUseMetricUseCase.execute({
        userId: request.user.sub,
        })
    
    return reply.status(200).send({
        checkInsCount
    })
    
    }