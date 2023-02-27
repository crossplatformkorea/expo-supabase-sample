import styled from '@emotion/native';
import {Button, EditText, Icon} from 'dooboo-ui';
import {Link, useRouter} from 'expo-router';
import type {ReactElement} from 'react';
import {useState} from 'react';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';

import {Pressable, View} from 'react-native';
import {supabase} from '../../src/supabase';
import {handleError} from '../../src/utils/error';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
`;

const InputWrapper = styled.View`
  width: 70%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const PasswordInputWrapper = styled.View`
  position: relative;
`;

export default function SignIn(): ReactElement {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (): Promise<void> => {
    setLoading(true);

    try {
      const {error} = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace('/(auth)/sign-in');
    } catch (error) {
      const errorMsg = handleError(error);

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container>
      <Heading1>{getString('SIGNUP')}</Heading1>
      <StyledLink href="./sign-in" style={{marginBottom: 30}}>
        <Body1>{getString('NAVIGATE', {name: getString('LOGIN')})}</Body1>
      </StyledLink>

      <InputWrapper>
        <EditText
          label={getString('EMAIL')}
          placeholder={getString('EMAIL')}
          editable={!loading}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{height: 24}} />
        <PasswordInputWrapper>
          <EditText
            label={getString('PASSWORD')}
            placeholder={getString('PASSWORD')}
            editable={!loading}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            style={{position: 'absolute', right: 0, top: '50%', opacity: 0.7}}
            onPress={handleShowPassword}
          >
            <Icon name="Lock" size={16} />
          </Pressable>
        </PasswordInputWrapper>
      </InputWrapper>
      {errorMessage ? (
        <View style={{marginBottom: 12}}>
          <Body1>{errorMessage}</Body1>
        </View>
      ) : null}

      <Button
        text={getString('SIGNUP')}
        disabled={loading}
        color={'success'}
        style={{width: '50%', maxWidth: 400}}
        onPress={handleSignUp}
      />
    </Container>
  );
}
