import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import EmailInput from '../../components/Input/EmailInput';
import PasswordInput from '../../components/Input/PasswordInput';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
    <S.PageWrapper>
      <Header />
      <S.Container>
        <CardBox title="MWU Login">
          <S.Form onSubmit={handleSubmit}>
            <S.InputGroup>
              <label>E-mail</label>
              <EmailInput value={email} onChange={setEmail} />
            </S.InputGroup>

            <S.InputGroup>
              <label>Senha</label>
              <PasswordInput value={password} onChange={setPassword} />
            </S.InputGroup>
            <S.ButtonGroup>
              <Button type="submit">Entrar</Button>
            </S.ButtonGroup>
            <S.FooterActions>
              <p>
                Não possui conta? <Link to="/register">Cadastre-se</Link>
              </p>
            </S.FooterActions>
          </S.Form>
        </CardBox>
      </S.Container>
      <Footer />
    </S.PageWrapper>
  );
};

export default LoginPage;
