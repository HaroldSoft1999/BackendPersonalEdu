import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Permiso } from '../permisos/permiso.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Rol, Permiso])], // Registra las entidades Rol y Permiso
  providers: [RolesService],
  controllers: [RolesController],
  exports: [TypeOrmModule], // Exporta para que otros módulos puedan usar el repositorio
})
export class RolesModule {}
