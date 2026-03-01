import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/decorators/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt.guards";
import { RolesGuard } from "src/auth/guards/roles.guards";
import { TrailerService } from "./trailerService.service";
import { CreateTrailerDto } from "./dto/createTrailerDto.dto";
import { UpdateTrailerDto } from "./dto/updateTrailerDto.dto";
@Controller('trailers')
export class TrailerController {
    constructor(private trailerService: TrailerService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() data: CreateTrailerDto) {
        return this.trailerService.createTrailer(data);
    }

    @Get('home')
    getHomeFeed() {
        return this.trailerService.getHomeFeed();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateTrailerDto) {
        return this.trailerService.updateTrailer(id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.trailerService.deleteTrailer(id);
    }
}