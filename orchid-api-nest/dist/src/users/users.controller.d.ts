import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    GetAllUsers(): Promise<{
        name: string | null;
        id: number;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        role: string;
        createdAt: Date;
    }[] | {
        message: string;
    }>;
}
