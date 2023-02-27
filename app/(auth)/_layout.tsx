import styled from '@emotion/native';
import {TabRouter} from '@react-navigation/native';
import {Navigator, Slot} from 'expo-router';
import type {ReactElement} from 'react';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

export default function AuthLayout(): ReactElement {
  return (
    <Navigator router={TabRouter} initialRouteName="sign-in">
      <Container>
        <Slot />
      </Container>
    </Navigator>
  );
}
