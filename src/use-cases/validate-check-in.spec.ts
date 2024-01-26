import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate checkin use case', () =>{

    beforeEach(async () =>{
         checkInsRepository = new InMemoryCheckInsRepository()
         sut= new ValidateCheckInUseCase(checkInsRepository)


        /*await gymsRepository.create({
            id: 'gym-01',
            title: 'Java script gym',
            description: '',
            phone: '',
            latitude: -5.1462788,
            longitude: -38.1907147
        })*/
         vi.useFakeTimers()
    })
    
    afterEach(() =>{
        vi.useRealTimers()
    })
    it('Should be able to validate the check in', async() =>{


        //vi.setSystemTime(new Date(2022, 0, 20, 8, 0 , 0 ))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })
     

        const {checkIn} = await sut.execute({
            checkInId: createdCheckIn.id
        })

        
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.Items[0].validated_at).toEqual(expect.any(Date))
    })
  

    it('Should be able to validate an inexistent check in', async() =>{

 await expect(() =>
 sut.execute({
    checkInId: 'inexistent-check-in-id'
 })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('Should not be able to validate the check-in after 20 minutes of the creation', async() =>{
      vi.setSystemTime(new Date(2023, 0, 1, 13, 40))  


      const createdCheckIn = await checkInsRepository.create({
        gym_id: 'gym-01',
        user_id: 'user-01'
    })

    const twenthOneMinutesInMs = 1000 * 60 *21
 
vi.advanceTimersByTime(twenthOneMinutesInMs)

await expect(() => sut.execute({
    checkInId: createdCheckIn.id
})).rejects.toBeInstanceOf(LateCheckInValidateError)

    
    })
})
