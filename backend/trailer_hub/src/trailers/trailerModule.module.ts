import { Module } from "@nestjs/common";
import { TrailerController } from "./trailerController.controller";
import { TrailerService } from "./trailerService.service";
import { PrismaModule } from "../prisma/prisma.module"; 

@Module({
  imports: [PrismaModule],
  controllers: [TrailerController],
  providers: [TrailerService],
})
export class TrailerModule {}