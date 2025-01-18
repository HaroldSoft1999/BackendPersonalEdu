import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService, // Inyección de JwtService
  ) {}

  async login(email: string, password: string): Promise<any> {
    // Buscar el usuario por email con sus roles
    const usuario = await this.usuariosService.obtenerUsuarioPorEmail(email, ['roles']);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    // Generar el token JWT
    const payload = { id: usuario.id, email: usuario.email, roles: usuario.roles.map((rol) => rol.nombre) };
    const token = this.jwtService.sign(payload);

    // Retornar el token y los datos del usuario
    return {
      message: 'Inicio de sesión exitoso',

      user: {
        id: usuario.id,
        email: usuario.email,
        roles: usuario.roles.map((rol) => rol.nombre), // Devolver todos los roles del usuario
      },

      token,
    };
  }

  async logout() {
    // Lógica de cierre de sesión (si usas tokens o sesiones)
    return {
      message: 'Cierre de sesión exitoso',
    };
  }
}
