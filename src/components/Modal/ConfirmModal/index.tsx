import React from 'react';
import Overlay from '../../Overlay';
import CardBox from '../../CardBox';
import Button from '../../Button/DefaultButton';
import Form from '../../Form';
import * as S from './styles';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmVariant?: 'danger' | 'primary' | 'warning';
  confirmIcon?: 'delete' | 'add' | 'update';
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  confirmVariant = 'danger',
  confirmIcon,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClose={onClose}>
      <CardBox title={title}>
        <S.Message>{message}</S.Message>

        <Form.Actions $align="stretch">
          <Button
            variant="primary"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant={confirmVariant}
            type="button"
            onClick={onConfirm}
            icon={confirmIcon}
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : confirmText}
          </Button>
        </Form.Actions>
      </CardBox>
    </Overlay>
  );
};

export default ConfirmModal;
