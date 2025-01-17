import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { randomUUID } from "crypto";


type ParamsUsers = {
    id: string;
}

type QueryUsers = {
    p: string;
    r: string;
}

type BodyUsers = {
    name: string;
    age: number;
}



@Controller("/users")
export class UserController {

    @Get("/:id")
    findById(@Param() params: ParamsUsers) {
        return "Usuario com id " + params.id;
    }

    @Get("/findByPages")
    findByPages(@Query() query: QueryUsers) {
        return 'Query: ' + query.p + ' ' + query.r;
    }

    @Post("/create")
    create(@Body() data: BodyUsers) {
        return {
            ...data,    
            id: randomUUID()
        }
    }

}
