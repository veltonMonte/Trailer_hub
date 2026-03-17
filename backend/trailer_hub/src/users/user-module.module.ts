import { Module } from "@nestjs/common";
import { UsersService } from "./user-service.service";
import { UsersController } from "./user-controller.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}