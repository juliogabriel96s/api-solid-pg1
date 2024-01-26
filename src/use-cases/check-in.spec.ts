import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInsUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumbersOfCheckInsError } from './errors/max-number-of-check-ins'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInsUseCase

describe('Check-Ins use case', () =>{

    beforeEach(async () =>{
         checkInsRepository = new InMemoryCheckInsRepository()
         gymsRepository =  new InMemoryGymsRepository()
         sut= new CheckInsUseCase(checkInsRepository, gymsRepository)


        await gymsRepository.create({
            id: 'gym-01',
            title: 'Java script gym',
            description: '',
            phone: '',
            latitude: -5.1462788,
            longitude: -38.1907147
        })
         vi.useFakeTimers()
    })
    
    afterEach(() =>{
        vi.useRealTimers()
    })
    it('Should be able to check in', async() =>{


        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 , 0 ))
     

        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })

        
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 , 0 ))

     
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })

        
        expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError)
    })



    it('Should be able to check in twice in different days', async() =>{

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 , 0 ))

     
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0 , 0 ))


        
        const {checkIn}= await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it('Should not be able to check in on distant gym', async() =>{


        gymsRepository.Items.push({
            id: 'gym-02',
            title: 'Java script gym',
            description: '',
            phone: '',
            latitude: new Decimal(-5.0008036,),
            longitude: new Decimal(-37.7438429)
        })


        vi.setSystemTime(new Date(2022, 0, 20, 8, 0 , 0 ))
     

        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -5.1462788,
            userLongitude: -38.1907147 
        })).rejects.toBeInstanceOf(MaxDistanceError)
        
    })
   
})
