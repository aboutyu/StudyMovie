import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

   async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {

       const { username, password } = authCredentialDto;

       const user = this.create({username, password});

       try {
           await this.save(user);
       } catch (error) {
           throw new InternalServerErrorException();
       }
   }
}