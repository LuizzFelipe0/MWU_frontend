import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button';
import * as S from './styles';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <S.Container>
      <CardBox title="MWU Login">
        <form onSubmit={handleSubmit}>
          <S.InputGroup>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </S.InputGroup>

          <S.InputGroup>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </S.InputGroup>

          <Button type="submit">Entrar</Button>
        </form>
      </CardBox>
    </S.Container>
  );
};

export default LoginPage;
