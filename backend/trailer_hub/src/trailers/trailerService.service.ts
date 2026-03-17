import { PrismaService } from '../prisma/prisma.service';
import { CreateTrailerDto } from './dto/createTrailerDto.dto';
import { UpdateTrailerDto } from './dto/updateTrailerDto.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Trailer } from '@prisma/client';

@Injectable()
export class TrailerService {
  constructor(private prisma: PrismaService) {}

  async getTrailerOrFail(id: string) {
    const trailer = await this.prisma.trailer.findUnique({
      where: { id },
    });

    if (!trailer) {
      throw new NotFoundException('Trailer não encontrado.');
    }

    return trailer;
  }

  async createTrailer(data: CreateTrailerDto) {
    return this.prisma.trailer.create({
      data,
    });
  }

  async updateTrailer(id: string, data: UpdateTrailerDto) {
    await this.getTrailerOrFail(id);

    return this.prisma.trailer.update({
      where: { id },
      data,
    });
  }

  async deleteTrailer(id: string) {
    await this.getTrailerOrFail(id);

    return this.prisma.trailer.delete({
      where: { id },
    });
  }

  async getHomeFeed() {
    const trailers = await this.prisma.$queryRaw<Trailer[]>`
            SELECT * FROM "trailers"
            ORDER BY RANDOM()
            LIMIT 50
        `;

    const grouped: Record<string, Trailer[]> = {};

    for (const trailer of trailers) {
      for (const categoria of trailer.categoria) {
        if (!grouped[categoria]) {
          grouped[categoria] = [];
        }

        grouped[categoria].push(trailer);
      }
    }

    const categoria = Object.keys(grouped);

    const shuffledCategorias = categoria.sort(() => Math.random() - 0.5);

    const selectedcategorias = shuffledCategorias.slice(0, 5);

    return selectedcategorias.map((categoria) => ({
      categoria,
      trailers: grouped[categoria],
    }));
  }
}
