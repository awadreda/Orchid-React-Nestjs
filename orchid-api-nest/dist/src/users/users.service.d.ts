import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private readonly _prisma;
    constructor(_prisma: PrismaService);
    getUsers(): Promise<User[]>;
}
