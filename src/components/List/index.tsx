import React, { ReactNode } from 'react';
import * as S from './styles';

interface ListProps {
  children: ReactNode;
}

const List: React.FC<ListProps> & {
  Item: typeof S.ListItem;
  Info: typeof S.Info;
  Actions: typeof S.Actions;
} = ({ children }) => {
  return <S.ListContainer>{children}</S.ListContainer>;
};

List.Item = S.ListItem;
List.Info = S.Info;
List.Actions = S.Actions;

export default List;
