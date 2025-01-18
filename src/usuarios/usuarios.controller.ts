import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorador';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Crear un usuario
  @Post()
  async crearUsuario(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuariosService.crearUsuario(data);
  }

  // Obtener todos los usuarios
  @Roles('Admin', 'SuperAdmin')
  @Get()
  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.obtenerUsuarios();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: number): Promise<Usuario> {
    return this.usuariosService.obtenerUsuarioPorId(id);
  }

  // Actualizar un usuario
  @Put(':id')
  async actualizarUsuario(
    @Param('id') id: number,
    @Body() data: Partial<Usuario>,
  ): Promise<Usuario> {
    return this.usuariosService.actualizarUsuario(id, data);
  }

  // Eliminar un usuario
  @Delete(':id')
  async eliminarUsuario(@Param('id') id: number): Promise<void> {
    return this.usuariosService.eliminarUsuario(id);
  }

  @Patch(':id/roles')
  async asignarRolesAUsuario(
    @Param('id') usuarioId: number,
    @Body('rolesIds') rolesIds: number[],
  ): Promise<Usuario> {
    return this.usuariosService.asignarRolesAUsuario(usuarioId, rolesIds);
  }
}
