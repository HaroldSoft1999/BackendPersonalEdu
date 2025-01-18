import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsuariosModule, // Para acceder al servicio de usuarios
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura la estrategia JWT
    JwtModule.register({
      secret: 'super-secret-key', // Cambia esto por una variable de entorno
      signOptions: { expiresIn: '1h' }, // Token válido por 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Incluye JwtStrategy aquí
  exports: [AuthService], // Exportar si otros módulos necesitan usar AuthService
})
export class AuthModule {}
