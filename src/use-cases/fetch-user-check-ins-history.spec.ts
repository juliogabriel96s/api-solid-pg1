import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInsUseCase } from './check-in'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'


let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch check-in history use case', () =>{

    beforeEach(async () =>{
         checkInsRepository = new InMemoryCheckInsRepository()
         sut= new FetchUserCheckInsHistoryUseCase(checkInsRepository)


       
    
    })
    
    
    it('Should be able to fetch check-in history', async() =>{
     
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })


        const {checkIn} = await sut.execute({
            userId: 'user-01',
            page: 1
           
        })

        
        expect(checkIn).toHaveLength(2)
        expect(checkIn).toEqual([
            expect.objectContaining({gym_id: 'gym-01'}),
            expect.objectContaining({gym_id: 'gym-02'}),

        ])
    })


     
    it('Should be able to fetch paginated check-in history', async() =>{
     
       

      for(let i = 1; i <= 22; i++){
        await checkInsRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'user-01'
        })
      }


        const {checkIn} = await sut.execute({
            userId: 'user-01',
            page: 2
           
        })

        
        expect(checkIn).toHaveLength(2)
        expect(checkIn).toEqual([
            expect.objectContaining({gym_id: 'gym-21'}),
            expect.objectContaining({gym_id: 'gym-22'}),

        ])
    })

   
})
