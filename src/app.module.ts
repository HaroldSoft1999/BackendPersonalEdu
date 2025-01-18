import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importar TypeOrmModule
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { PermisosModule } from './permisos/permisos.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'haroldsoft.com', // Servidor SQL
      port: 3306, // Puerto configurado
      username: 'gbupgbcb_harold', // Usuario de SQL Server
      password: '70822300Go..', // Contraseña de SQL Server
      database: 'gbupgbcb_apipersonal', // Base de datos
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entidades
      synchronize: true, // ¡Solo usar en desarrollo!
      logging: true, // Opcional: habilita logs para depuración

    }),
    UsuariosModule,
    RolesModule,
    AuthModule,
    PermisosModule,
    SeederModule,
  ],
})
export class AppModule {}
