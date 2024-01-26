import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepository{
   
   
    public Items: Gym[] = []

   async findById(id: string){
        const gym = this.Items.find(item => item.id === id)

       if(!gym){
        return null
       }

       return gym
    }


    async create(data: Prisma.GymCreateInput){
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        }

        this.Items.push(gym)

        return gym
    }

    async searchMany(query: string, page: number){
        return this.Items
        .filter(item => item.title.includes(query))
        .slice((page - 1) * 20, page * 20)
    }

    async findManyNearby(params: FindManyNearbyParams) {
return this.Items.filter(item => {
    const distance = getDistanceBetweenCoordinates(
        {latitude: params.latitude, longitude: params.longitude},
        {latitude: item.latitude.toNumber(),longitude: item.longitude.toNumber()}
        )

        return distance < 10
    })
    
}

}

