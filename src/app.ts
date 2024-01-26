import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { usersRoutes } from "./http/controller/users/routes";
import { gymsRoutes } from "./http/controller/gyms/routes";
import { checkInsRoutes } from "./http/controller/check-ins/routes";

export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, request, reply) =>{
if(error instanceof ZodError){
return reply
.status(400)
.send({message:'Validation Error.', issues: error.format()})
}

if(env.NODE_ENV !== 'production'){
console.error(error)
}else{
    // here he should log to any external too like Datadog/NewRelic/Sentry
}
return reply.status(500).send({message: 'Internal server error.'})

})