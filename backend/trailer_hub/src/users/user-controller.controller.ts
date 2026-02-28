import { Body, Controller, Param, Put, Delete, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./user-service.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guards";
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';



@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: UpdateUserDto,
        @Req() req: Request & { user: JwtPayload }
    ) {
        const user = req.user;

        return this.usersService.update(id, data, user);
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Req() req: Request & { user: JwtPayload }
    ) {
        const user = req.user;

        return this.usersService.remove(id, user);
    }
}

