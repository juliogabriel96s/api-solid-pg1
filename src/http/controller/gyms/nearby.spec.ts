import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Nearby Gym e2e', () =>{

    beforeAll(async () =>{
        await app.ready()
    })

    afterAll(async() =>{
       await app.close()
    })

    it('should be able to list nearby gym', async () =>{

       const {token} = await createAndAuthenticateUser(app)

      await request(app.server)
     .post('/gyms')
     .set('Authorization', `Bearer ${token}`)
     .send({
        title: 'JavaScript gym',
        description: 'some desceription',
        phone: '98732653',
        latitude: -5.1462788,
        longitude: -38.1907147 
     })

     await request(app.server)
     .post('/gyms')
     .set('Authorization', `Bearer ${token}`)
     .send({
        title: 'TypeScript gym',
        description: 'some desceription',
        phone: '98732653',
        latitude: -4.8456776,
        longitude: -37.3732047 
     })

     const response = await request(app.server)
     .get('/gyms/nearby')
     .query({
        latitude: -5.1462788,
        longitude: -38.1907147 
     })
     .set('Authorization', `Bearer ${token}`)
     .send()


     expect(response.statusCode).toEqual(200)
     expect(response.body.gyms).toHaveLength(1)
     expect(response.body.gyms).toEqual([
        expect.objectContaining({
            title: 'JavaScript gym'
        })
     ])

    })
})