import { PrismaService } from "src/infra/database/infra.services";

export type CreateUserDTO = {
    username: string;
    name: string;
    email: string;
    password: string;
}

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
            throw new Error('User already exists');
        }

        return await this.prisma.user.create({
            data
        })
    }
}