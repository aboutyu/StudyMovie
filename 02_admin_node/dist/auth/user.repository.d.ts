import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialDto } from './dto/auth-credential.dto';
export declare class UserRepository extends Repository<User> {
    createUser(authCredentialDto: AuthCredentialDto): Promise<void>;
}
