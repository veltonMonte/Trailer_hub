import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TrailerService } from './trailerService.service';
import { CreateTrailerDto } from './dto/createTrailerDto.dto';
import { UpdateTrailerDto } from './dto/updateTrailerDto.dto';

import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('trailers')
export class TrailerController {
  constructor(private trailerService: TrailerService) {}

  @Get('home')
  getHomeFeed() {
    return this.trailerService.getHomeFeed();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trailerService.getTrailerOrFail(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() data: CreateTrailerDto,
          @Req() req: Request & { user: JwtPayload }) {
    return this.trailerService.createTrailer(data, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTrailerDto) {
    return this.trailerService.updateTrailer(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.trailerService.deleteTrailer(id);
  }
}
