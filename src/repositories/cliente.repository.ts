import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Direccion, UsuarioCliente} from '../models';
import {DireccionRepository} from './direccion.repository';
import {UsuarioClienteRepository} from './usuario-cliente.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly direccionCliente: HasOneRepositoryFactory<Direccion, typeof Cliente.prototype.id>;

  public readonly usuarioCliente: HasOneRepositoryFactory<UsuarioCliente, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DireccionRepository') protected direccionRepositoryGetter: Getter<DireccionRepository>, @repository.getter('UsuarioClienteRepository') protected usuarioClienteRepositoryGetter: Getter<UsuarioClienteRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuarioCliente = this.createHasOneRepositoryFactoryFor('usuarioCliente', usuarioClienteRepositoryGetter);
    this.registerInclusionResolver('usuarioCliente', this.usuarioCliente.inclusionResolver);
    this.direccionCliente = this.createHasOneRepositoryFactoryFor('direccionCliente', direccionRepositoryGetter);
    this.registerInclusionResolver('direccionCliente', this.direccionCliente.inclusionResolver);
  }
}
