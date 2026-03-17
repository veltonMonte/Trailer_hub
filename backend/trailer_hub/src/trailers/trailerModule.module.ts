import { Module } from "@nestjs/common";
import { TrailerController } from "./trailerController.controller";
import { TrailerService } from "./trailerService.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [TrailerController],
  providers: [TrailerService, PrismaService],
})
export class TrailerModule {}
