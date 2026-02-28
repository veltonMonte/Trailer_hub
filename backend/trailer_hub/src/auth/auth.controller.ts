import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/loginDto.dto";
import { RegisterDto } from "./dto/registerDto.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async create(@Body() data: RegisterDto) {
        return this.authService.create(data)
    }

    @Post('login') 
    async login(@Body() body: LoginDto){
        return this.authService.login(body);
    }
}