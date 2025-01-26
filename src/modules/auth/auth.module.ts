import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '60m' },
    }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
