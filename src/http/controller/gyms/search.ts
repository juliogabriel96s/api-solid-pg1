import {z} from 'zod'
import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsUseCase } from '@/use-cases/factores/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply){
    const searchGymQyerySchema = z.object({
       q: z.string(),
       page: z.coerce.number().min(1).default(1)
    })
    
    const {q, page} = searchGymQyerySchema.parse(request.query)

         const searchGymUseCase = makeSearchGymsUseCase()
      const {gym} =  await searchGymUseCase.execute({
           query: q,
           page
        })
    
    return reply.status(200).send({
        gym
    })
    
    }