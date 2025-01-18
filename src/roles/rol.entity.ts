import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable  } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';
import { Permiso } from '../permisos/permiso.entity';



@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  usuarios: Usuario[];

  @ManyToMany(() => Permiso, (permiso) => permiso.roles)
  @JoinTable({
    name: 'rol_permisos', // Nombre personalizado de la tabla intermedia
    joinColumn: { name: 'rol_id', referencedColumnName: 'id' }, // FK hacia Rol
    inverseJoinColumn: { name: 'permiso_id', referencedColumnName: 'id' }, // FK hacia Permiso
  })
  permisos: Permiso[];
}