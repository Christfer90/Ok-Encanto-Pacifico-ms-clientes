import {Entity, model, property, hasOne} from '@loopback/repository';
import {Direccion} from './direccion.model';
import {UsuarioCliente} from './usuario-cliente.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'boolean',
  })
  es_activo?: boolean;

  @hasOne(() => Direccion, {keyTo: 'id_cliente'})
  direccionCliente: Direccion;

  @hasOne(() => UsuarioCliente, {keyTo: 'id_cliente'})
  usuarioCliente: UsuarioCliente;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
