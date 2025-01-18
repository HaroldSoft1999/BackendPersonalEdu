import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async crearPermiso(nombre: string): Promise<Permiso> {
    const permiso = this.permisoRepository.create({ nombre });
    return this.permisoRepository.save(permiso);
  }

  async obtenerPermisos(): Promise<Permiso[]> {
    return this.permisoRepository.find();
  }

  async obtenerPermisoPorId(id: number): Promise<Permiso> {
    return this.permisoRepository.findOneBy({ id });
  }

  async actualizarPermiso(id: number, nombre: string): Promise<Permiso> {
    const permiso = await this.obtenerPermisoPorId(id);
    if (!permiso) {
      throw new Error('Permiso no encontrado');
    }
    permiso.nombre = nombre;
    return this.permisoRepository.save(permiso);
  }

  async eliminarPermiso(id: number): Promise<void> {
    await this.permisoRepository.delete(id);
  }
}
