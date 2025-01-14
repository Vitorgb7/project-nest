import { Controller, Get, Param } from "@nestjs/common";


type ParamsUsers = {
    id: string;
}



@Controller()
export class UserController {

    @Get("/users/:id")
    findById(@Param() params: ParamsUsers) {
        return "Usuario com id " + params.id;
    }
}