import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../roles/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])], // Registra Usuario y Rol
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
