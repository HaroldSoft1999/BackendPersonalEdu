import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Rol } from '../roles/rol.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  @JoinTable({
    name: 'usuario_roles', // Nombre personalizado de la tabla intermedia
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' }, // FK hacia Usuario
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' }, // FK hacia Rol
  })
  roles: Rol[];
}