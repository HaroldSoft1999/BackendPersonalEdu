import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './rol.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';


@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Crear un rol
  @Post()
  async crearRol(@Body('nombre') nombre: string): Promise<Rol> {
    return this.rolesService.crearRol(nombre);
  }

  // Obtener todos los roles
  @Get()
  async obtenerRoles(): Promise<Rol[]> {
    return this.rolesService.obtenerRoles();
  }

  // Obtener un rol por ID
  @Get(':id')
  async obtenerRolPorId(@Param('id') id: number): Promise<Rol> {
    return this.rolesService.obtenerRolPorId(id);
  }

  // Actualizar un rol
  @Put(':id')
  async actualizarRol(
    @Param('id') id: number,
    @Body('nombre') nombre: string,
  ): Promise<Rol> {
    return this.rolesService.actualizarRol(id, nombre);
  }

  // Eliminar un rol
  @Delete(':id')
  async eliminarRol(@Param('id') id: number): Promise<void> {
    return this.rolesService.eliminarRol(id);
  }

  @Patch(':id/permisos')
  async asignarPermisosARol(
    @Param('id') rolId: number,
    @Body('permisosIds') permisosIds: number[],
  ): Promise<Rol> {
    return this.rolesService.asignarPermisosARol(rolId, permisosIds);
  }
}
