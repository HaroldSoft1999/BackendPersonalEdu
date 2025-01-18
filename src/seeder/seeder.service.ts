import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Rol } from '../roles/rol.entity';
import * as bcrypt from 'bcrypt';
import { Permiso } from '../permisos/permiso.entity';


@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async seed() {
    // Crear permisos
    const permisosNombres = ['Crear', 'ListarTodo', 'Editar', 'Eliminar', 'ObtenerById'];
    const permisos = [];

    for (const nombre of permisosNombres) {
      let permiso = await this.permisoRepository.findOneBy({ nombre });
      if (!permiso) {
        permiso = this.permisoRepository.create({ nombre });
        permiso = await this.permisoRepository.save(permiso);
      }
      permisos.push(permiso);
    }

    // Crear roles
    const rolesConfig = [
      { nombre: 'SuperAdmin', permisos: permisos }, // Todos los permisos
      { nombre: 'Admin', permisos: permisos.filter((p) => p.nombre !== 'Eliminar' && p.nombre !== 'ObtenerById') },
      { nombre: 'Usuario', permisos: permisos.filter((p) => p.nombre === 'ObtenerById') },
    ];

    const roles = [];
    for (const { nombre, permisos: rolPermisos } of rolesConfig) {
      let rol = await this.rolRepository.findOne({
        where: { nombre },
        relations: ['permisos'],
      });

      if (!rol) {
        rol = this.rolRepository.create({ nombre, permisos: rolPermisos });
        rol = await this.rolRepository.save(rol);
      } else {
        rol.permisos = rolPermisos;
        rol = await this.rolRepository.save(rol);
      }
      roles.push(rol);
    }

    // Crear usuarios
    const usuariosConfig = [
      {
        nombre: 'superadmin',
        email: 'superadmin@superadmin.com',
        password: '123456789',
        roles: [roles.find((r) => r.nombre === 'SuperAdmin')],
      },
      {
        nombre: 'admin',
        email: 'admin@admin.com',
        password: '123456789',
        roles: [roles.find((r) => r.nombre === 'Admin')],
      },
      {
        nombre: 'usuario',
        email: 'usuario@usuario.com',
        password: '123456789',
        roles: [roles.find((r) => r.nombre === 'Usuario')],
      },
    ];

    for (const { nombre, email, password, roles: usuarioRoles } of usuariosConfig) {
      let usuario = await this.usuarioRepository.findOneBy({ email });
      if (!usuario) {
        const hashedPassword = await bcrypt.hash(password, 10);
        usuario = this.usuarioRepository.create({
          nombre,
          email,
          password: hashedPassword,
          roles: usuarioRoles,
        });
        await this.usuarioRepository.save(usuario);
      }
    }

    console.log('Datos iniciales cargados correctamente.');
  }
}