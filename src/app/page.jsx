import { getClientesDB } from '@/bd/useCases/clienteUseCases';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const clientes = await getClientesDB();

  return (
    <div style={{ padding: '20px' }}>
      <div className="row">
        {clientes && clientes.length > 0 ? (
          clientes.map(cliente => (
            <div className="col-sm-3" key={cliente.codigo}>
              <div className="card mb-3 text-center">
                <div className="card-header">
                  {cliente.nome}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{cliente.nome}</h5>
                  <p className="card-text">
                    <small className="text-muted">CPF: {cliente.cpf}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Telefone: {cliente.telefone}</small>
                  </p>
                </div>
                <div className="card-footer text-muted">
                  <Link className="btn btn-secondary" href={`/${cliente.codigo}/detalhe`}>
                    Detalhes do cliente
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum cliente encontrado.</p>
        )}
      </div>
    </div>
  );
}
