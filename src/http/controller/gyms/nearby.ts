import {z} from 'zod'
import { FastifyRequest, FastifyReply } from "fastify"
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factores/make-fetch-nearby-gyms-use-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply){
    const nearbyGymQyerySchema = z.object({
        latitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value =>{
            return Math.abs(value) <= 180
        })
    })
    
    const {latitude, longitude} = nearbyGymQyerySchema.parse(request.query)

         const FetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
      const {gym} =  await FetchNearbyGymsUseCase.execute({
           userLatitude: latitude,
           userLongitude: longitude
        })
    
    return reply.status(200).send({
        gym
    })
    
    }