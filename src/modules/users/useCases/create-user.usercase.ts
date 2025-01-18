import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/infra.services";
import { CreateUserDTO } from "src/modules/dto/user.dto";
import {hash} from 'bcrypt'


@Injectable()
export class CreateUserUseCase {
    constructor(private prisma: PrismaService) {

    }

    async execute(data: CreateUserDTO) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {username: data.username},
                    {email: data.email}
                ]
            }
        })

        if(user) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
        }

        const passwordHash = await hash(data.password, 8)

        return await this.prisma.user.create({
            data : {
                ...data,
                password: passwordHash
            }
        })
    }
}