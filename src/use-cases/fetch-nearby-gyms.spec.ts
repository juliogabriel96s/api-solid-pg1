import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () =>{

    beforeEach(async () =>{
         gymsRepository = new InMemoryGymsRepository()
         sut= new FetchNearbyGymsUseCase(gymsRepository)


       
    
    })
    
    
    it('Should be able to fetch nearby  gyms', async() =>{
     
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
          phone: null,
          latitude: -5.1462788,
          longitude: -38.1907147 
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
          phone: null,
          latitude: -4.8456776,
          longitude: -37.3732047 
        })
        

        const {gym} = await sut.execute({
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
           
        })

        
        expect(gym).toHaveLength(1)
        expect(gym).toEqual([
            expect.objectContaining({title: 'Near Gym'})

        ])
    })


     
    
   
})
