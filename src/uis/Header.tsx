import styled from '@emotion/native';
import type {ReactElement} from 'react';
import {Heading1} from './Typography';

const Container = styled.View`
  justify-content: center;

  padding: 0px 20px 0px 20px;
  height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.text.basic};
`;

export default function Header(): ReactElement {
  return (
    <Container>
      <Heading1>Welcome to expo router Demo!</Heading1>
    </Container>
  );
}
