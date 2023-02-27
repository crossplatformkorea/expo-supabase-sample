import styled from '@emotion/native';
import {Button} from 'dooboo-ui';
import type {ReactElement} from 'react';
import {getString} from '../../STRINGS';
import {supabase} from '../supabase';
import {Heading1} from './Typography';

const Container = styled.View`
  padding: 0px 20px 0px 20px;
  height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.text.basic};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default function Header(): ReactElement {
  return (
    <Container>
      <Heading1>{getString('TITLE')}</Heading1>

      <Button
        text={getString('LOGOUT')}
        onPress={() => supabase.auth.signOut()}
      />
    </Container>
  );
}
