'use client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Separate Client Component that uses useSearchParams
function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleLogin = async (formData) => {
    console.log('formData: ' + JSON.stringify(formData));
    await signIn('credentials', {
      email: formData.get('email'),
      senha: formData.get('senha'),
      callbackUrl: '/',
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div style={{ textAlign: 'center' }}>
          <h2>Login de Usuário</h2>
        </div>
        {error && (
          <h4 className="text-center" style={{ color: 'red' }}>
            Falha ao efetuar o login. Usuário ou senha inválidos.
          </h4>
        )}
        <div className="col-12 col-md-6">
          <Form action={handleLogin} method="POST">
            <Form.Group className="mb-3" controlId="txtEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Informe o email"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="txtSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="senha"
                required
              />
            </Form.Group>
            <div className="form-group text-center mt-3">
              <Button variant="primary" type="submit">
                Efetuar Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

// Main Login Component with Suspense Boundary
export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}