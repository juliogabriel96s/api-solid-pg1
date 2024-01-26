import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository{
   
    public Items: User[] = []

   async findById(id: string){
        const user = this.Items.find(item => item.id === id)

       if(!user){
        return null
       }

       return user
    }

    async findyByEmail(email: string) {
       const user = this.Items.find(item => item.email === email)

       if(!user){
        return null
       }

       return user
    }
    async create(data: Prisma.UserCreateInput){
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.Items.push(user)

        return user
    }

}



