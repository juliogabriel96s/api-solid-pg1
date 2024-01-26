import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search Gym e2e', () =>{

    beforeAll(async () =>{
        await app.ready()
    })

    afterAll(async() =>{
       await app.close()
    })

    it('should be able to search gym by title', async () =>{

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
        latitude: -5.1462788,
        longitude: -38.1907147 
     })

     const response = await request(app.server)
     .get('/gyms/search')
     .query({
        q: 'JavaScript'
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