import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthResolver, AuthService, JwtService],
})
export class AuthModule { }
