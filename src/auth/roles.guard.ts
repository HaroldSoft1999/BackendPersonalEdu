import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos desde el decorador @Roles
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, se permite el acceso
    }

    // Obtener el token desde la cabecera Authorization
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extraer solo el token (sin "Bearer")
    if (!token) {
      console.error('Token no proporcionado');
      return false; // Bloquear si no hay token
    }

    try {
      // Decodificar el token usando jsonwebtoken
      const decoded: any = jwt.verify(token, 'super-secret-key'); // Usa tu clave secreta aquí
      console.log('Token decodificado:', decoded);

      // Asignar los datos decodificados a request.user
      request.user = decoded; // Aquí asignamos directamente el usuario

      // Obtener los roles del usuario
      const userRoles = decoded.roles; // Roles obtenidos del token
      console.log('Roles del usuario:', userRoles);

      // Verificar si el usuario tiene al menos uno de los roles requeridos
      return requiredRoles.some((role) => userRoles?.includes(role));
    } catch (err) {
      console.error('Error al decodificar el token:', err.message);
      return false; // Bloquear si el token no es válido
    }
  }
}
