import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Post()
  async crearPermiso(@Body('nombre') nombre: string) {
    return this.permisosService.crearPermiso(nombre);
  }

  @Get()
  async obtenerPermisos() {
    return this.permisosService.obtenerPermisos();
  }

  @Get(':id')
  async obtenerPermisoPorId(@Param('id') id: number) {
    return this.permisosService.obtenerPermisoPorId(id);
  }

  @Patch(':id')
  async actualizarPermiso(@Param('id') id: number, @Body('nombre') nombre: string) {
    return this.permisosService.actualizarPermiso(id, nombre);
  }

  @Delete(':id')
  async eliminarPermiso(@Param('id') id: number) {
    return this.permisosService.eliminarPermiso(id);
  }
}
