import React, { ReactNode, FormEvent } from 'react';
import * as S from './styles';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
}

const Form: React.FC<FormProps> & {
  Field: typeof S.Field;
  Actions: typeof S.Actions;
  Footer: typeof S.Footer;
} = ({ children, onSubmit }) => {
  return <S.FormContainer onSubmit={onSubmit}>{children}</S.FormContainer>;
};

Form.Field = S.Field;
Form.Actions = S.Actions;
Form.Footer = S.Footer;

export default Form;
