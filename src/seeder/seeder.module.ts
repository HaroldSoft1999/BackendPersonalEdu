import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Rol } from '../roles/rol.entity';
import { Permiso } from '../permisos/permiso.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol,Permiso])],
  providers: [SeederService],
})
export class SeederModule {}
