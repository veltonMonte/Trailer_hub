import { PrismaService } from "src/prisma/prisma.service";
import { CreateTrailerDto } from "./dto/createTrailerDto.dto";
import { UpdateTrailerDto } from "./dto/updateTrailerDto.dto";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TrailerService {
    constructor(private prisma: PrismaService) { }

    async getTrailerOrFail(id: string) {
        const trailer = await this.prisma.trailer.findUnique({
            where: { id },
        });

        if (!trailer) {
            throw new NotFoundException('Trailer não encontrado.');
        }
    }

    async createTrailer(data: CreateTrailerDto) {
        return this.prisma.trailer.create({
            data: { ...data },
        });
    }

    async updateTrailer(id: string, data: UpdateTrailerDto) {

        await this.getTrailerOrFail(id);

        return this.prisma.trailer.update({
            where: { id },
            data
        })

    }

    async deleteTrailer(id: string) {

        await this.getTrailerOrFail(id);

        return this.prisma.trailer.delete({
            where: { id },
        });

    }
}