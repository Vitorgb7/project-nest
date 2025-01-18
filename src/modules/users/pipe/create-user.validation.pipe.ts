import { ArgumentMetadata, PipeTransform, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDTO } from "src/modules/dto/user.dto";


@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
    transform({name, username, email, password}: CreateUserDTO, metadata: ArgumentMetadata) {

        if (!name || !username || !email || !password) {
            throw new HttpException("name is required", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return {
            name, username, email, password
        }

    }
}