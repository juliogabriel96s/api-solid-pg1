import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInsUseCase } from './check-in'
import { GetuserMetricsUseCase } from './get-user-metrics'


let checkInsRepository: InMemoryCheckInsRepository
let sut: GetuserMetricsUseCase

describe('Get user metrics use case', () =>{

    beforeEach(async () =>{
         checkInsRepository = new InMemoryCheckInsRepository()
         sut= new GetuserMetricsUseCase(checkInsRepository)


       
    
    })
    
    
    it('Should be able to get checkIns counts from metrics', async() =>{
     
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })


        const {checkInsCount} = await sut.execute({
            userId: 'user-01',
         
           
        })

        
        expect(checkInsCount).toEqual(2)
       
    })
    
})
