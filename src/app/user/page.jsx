"use client";

import { useSession } from "next-auth/react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import CampoEntradaFloating from "@/componentes/comuns/CampoEntradaFloating";
import Loading from "@/componentes/comuns/Loading";
import { useState } from "react";

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Erro ao alterar a senha.");
      }

      setSuccess("Senha alterada com sucesso!");
      e.target.reset(); // Clear form
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (!session || !session.user) {
    return <div>Por favor, faça login para ver seus dados.</div>;
  }

  const { name, email, tipo, id, randomKey } = session.user;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h2>Dados do Usuário</h2>
              </Card.Title>
              <div className="mb-3">
                <strong>Nome:</strong> {name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {email}
              </div>
              <div className="mb-3">
                <strong>Tipo:</strong> {tipo}
              </div>
              <div className="mb-3">
                <strong>ID:</strong> {id}
              </div>
              <div className="mb-3">
                <strong>Chave Aleatória:</strong> {randomKey}
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h3>Alterar Senha</h3>
              </Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <CampoEntradaFloating
                  id="txtCurrentPassword"
                  label="Senha Atual"
                  name="currentPassword"
                  tipo="password"
                  readOnly={false}
                  required={true}
                />
                <CampoEntradaFloating
                  id="txtNewPassword"
                  label="Nova Senha"
                  name="newPassword"
                  tipo="password"
                  readOnly={false}
                  required={true}
                />
                <CampoEntradaFloating
                  id="txtConfirmPassword"
                  label="Confirmar Nova Senha"
                  name="confirmPassword"
                  tipo="password"
                  readOnly={false}
                  required={true}
                />
                <div className="form-group text-center mt-3">
                  <Button
                    type="submit"
                    variant="success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Alterando..."
                    ) : (
                      <>
                        Alterar Senha <i className="bi bi-save"></i>
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}