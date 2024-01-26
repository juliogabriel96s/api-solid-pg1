import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymsUseCase } from './create-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymsUseCase

describe('Create gym use case', () =>{

    beforeEach(() =>{
         gymsRepository = new InMemoryGymsRepository()
         sut= new CreateGymsUseCase(gymsRepository)
    })

    it('Should be able to create gym', async() =>{
     

        const {gym} = await sut.execute({
          title: 'JavaScript Gym',
          description: null,
          phone: null,
          latitude: -5.1462788,
          longitude: -38.1907147 
        })

        
        expect(gym.id).toEqual(expect.any(String))
    })


})