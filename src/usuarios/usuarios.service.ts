import { Injectable } from '@nestjs/common';
import { Usuario } from './usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../roles/rol.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>, // Repositorio para la entidad Usuario
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>, // Repositorio de Rol
  ) {}

  // Crear un usuario
  async crearUsuario(data: Partial<Usuario>): Promise<Usuario> {
    // Encriptar la contraseña antes de guardar el usuario
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const usuario = this.usuarioRepository.create(data);
    return this.usuarioRepository.save(usuario);
  }

  // Obtener todos los usuarios
  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Obtener un usuario por ID
  async obtenerUsuarioPorId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id } });
  }

  // Actualizar un usuario
  async actualizarUsuario(id: number, data: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, data);
    return this.obtenerUsuarioPorId(id); // Retorna el usuario actualizado
  }

  // Eliminar un usuario
  async eliminarUsuario(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  // Método para asignar roles a usuarios
  async asignarRolesAUsuario(usuarioId: number, rolesIds: number[]): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['roles'],
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const roles = await this.rolRepository.findByIds(rolesIds); // Encuentra los roles
    usuario.roles = roles; // Asigna los roles al usuario
    return this.usuarioRepository.save(usuario); // Guarda el usuario con los nuevos roles
  }

  async obtenerUsuarioPorEmail(email: string, relations: string[] = []): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: { email },
      relations,
    });
  }

}
