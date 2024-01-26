import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create Gym e2e', () =>{

    beforeAll(async () =>{
        await app.ready()
    })

    afterAll(async() =>{
       await app.close()
    })

    it('should be able to create gym', async () =>{

       const {token} = await createAndAuthenticateUser(app)

     const response = await request(app.server)
     .post('/gyms')
     .set('Authorization', `Bearer ${token}`)
     .send({
        title: 'JavaScript gym',
        description: 'some desceription',
        phone: '98732653',
        latitude: -5.1462788,
        longitude: -38.1907147 
     })

     expect(response.statusCode).toEqual(201)
    


    

    })
})