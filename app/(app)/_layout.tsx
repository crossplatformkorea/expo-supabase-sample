import styled, {css} from '@emotion/native';
import {TabRouter} from '@react-navigation/native';
import {Navigator, Slot} from 'expo-router';
import type {ReactElement} from 'react';
import Header from '../../src/uis/Header';
import RootNavigator from '../../src/uis/RootNavigator';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};

  flex-direction: column-reverse;

  ${({theme: {isMobile}}) =>
    !isMobile &&
    css`
      flex-direction: row;
    `}
`;

const Contents = styled.View`
  flex: 1;
  align-self: stretch;
`;

export default function AppLayout(): ReactElement {
  return (
    <Navigator router={TabRouter} initialRouteName="/">
      <Container>
        <RootNavigator />
        <Contents>
          <Header />
          <Slot />
        </Contents>
      </Container>
    </Navigator>
  );
}
