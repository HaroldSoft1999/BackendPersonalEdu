import { Injectable } from '@nestjs/common';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from '../permisos/permiso.entity';


@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  // Crear un rol
  async crearRol(nombre: string): Promise<Rol> {
    const rol = this.rolRepository.create({ nombre });
    return this.rolRepository.save(rol);
  }

  // Obtener todos los roles
  async obtenerRoles(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  // Obtener un rol por ID
  async obtenerRolPorId(id: number): Promise<Rol> {
    return this.rolRepository.findOne({ where: { id } });
  }

  // Actualizar un rol
  async actualizarRol(id: number, nombre: string): Promise<Rol> {
    const rol = await this.obtenerRolPorId(id);
    if (!rol) {
      throw new Error('Rol no encontrado');
    }
    rol.nombre = nombre;
    return this.rolRepository.save(rol);
  }

  // Eliminar un rol
  async eliminarRol(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }

  // Método para asignar permisos a un rol
  async asignarPermisosARol(rolId: number, permisosIds: number[]): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { id: rolId },
      relations: ['permisos'],
    });

    if (!rol) {
      throw new Error('Rol no encontrado');
    }

    const permisos = await this.permisoRepository.findByIds(permisosIds);
    if (permisos.length === 0) {
      throw new Error('Permisos no encontrados');
    }

    rol.permisos = permisos; // Asigna los permisos al rol
    return this.rolRepository.save(rol); // Guarda los cambios
  }
}
