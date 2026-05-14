import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RtGuard } from 'src/common/guards/rt.guard';
import { CurrentUser, CurrentUserId } from 'src/common/decorators/get-current-user.decorator';
import { ApiRegister } from './decorators/api-register.decorator';
import { ApiLogin } from './decorators/api-login.decorator';
import { ApiRefresh } from './decorators/api-refresh.decorator';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiRegister()
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiLogin()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RtGuard) // Custom Guard used for 'jwt-refresh'
  @Post('refresh')
  @ApiRefresh()
  @ApiBearerAuth() // Show the padlock onSwagger
  refresh(@CurrentUserId() userId: string, @CurrentUser('refreshToken') rt: string) {
    return this.authService.refreshTokens(userId, rt);
  }
}
