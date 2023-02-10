import {Button, useDooboo} from 'dooboo-ui';
import {Image, View} from 'react-native';
import type {ReactElement} from 'react';
import {useState} from 'react';

import {IC_MASK} from '../src/utils/Icons';
import IntroView from '../src/uis/IntroTemp';
import {getString} from '../STRINGS';
import styled from '@emotion/native';
import {useRouter} from 'expo-router';
import {useAppContext} from '../src/providers/AppProvider';
import type {User} from '../src/types';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  overflow: scroll;
  background-color: ${({theme}) => theme.bg.basic};

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 72%;
  align-self: center;
`;

type Props = {};

function Intro({}: Props): ReactElement {
  let timer: any;

  const {setUser} = useAppContext();
  const router = useRouter();
  const {changeThemeType} = useDooboo();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onLogin = (): void => {
    setIsLoggingIn(true);

    timer = setTimeout(() => {
      const tempUser: User = {
        displayName: 'dooboolab',
        age: 30,
        job: 'developer',
      };

      setUser(tempUser);
      setIsLoggingIn(false);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <Container>
      <IntroView />
      <ButtonWrapper>
        <Button
          testID="btn-login"
          startElement={
            <Image
              source={IC_MASK}
              style={{
                position: 'absolute',
                left: 12,
                width: 24,
                height: 24,
              }}
            />
          }
          loading={isLoggingIn}
          onPress={() => onLogin()}
          text={getString('LOGIN')}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-navigate"
          onPress={() => router.push('/temp')}
          text={getString('NAVIGATE', {name: 'Temp'})}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-theme"
          onPress={(): void => changeThemeType()}
          text={getString('CHANGE_THEME')}
        />
      </ButtonWrapper>
    </Container>
  );
}

export default Intro;
