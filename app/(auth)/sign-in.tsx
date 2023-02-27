import {View} from 'react-native';
import type {ReactElement} from 'react';
import {useCallback, useState} from 'react';
import {supabase} from '../../src/supabase';
import styled from '@emotion/native';
import {Body1, Heading1} from '../../src/uis/Typography';
import {getString} from '../../STRINGS';
import {Button, EditText} from 'dooboo-ui';
import {handleError} from '../../src/utils/error';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.View`
  width: 85%;
  max-width: 600px;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.View`
  width: 80%;
  max-width: 500px;
`;

const ErrorMessage = styled(Body1)`
  color: ${({theme}) => theme.text.validation};
`;

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cleanUpValues = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSignIn = async (): Promise<void> => {
    setLoading(true);

    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      const errorMsg = handleError(error);

      setErrorMessage(errorMsg);
    } finally {
      cleanUpValues();
      setLoading(false);
    }
  };

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
    } catch (error) {
      const errorMsg = handleError(error);

      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Heading1 style={{marginBottom: 20}}>{getString('LOGIN')}</Heading1>

      <InputWrapper>
        <EditText
          label={getString('EMAIL')}
          placeholder={getString('EMAIL')}
          editable={!loading}
          value={email}
          onChangeText={setEmail}
        />
        <View style={{height: 24}} />
        <EditText
          label={getString('PASSWORD')}
          placeholder={getString('PASSWORD')}
          editable={!loading}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputWrapper>

      {errorMessage ? (
        <ErrorMessage style={{marginBottom: 12}}>
          <Body1>{errorMessage}</Body1>
        </ErrorMessage>
      ) : null}

      <ButtonWrapper>
        <Button
          text={getString('LOGIN')}
          color="primary"
          loading={loading}
          disabled={loading}
          onPress={handleSignIn}
        />
        <View style={{height: 12}} />
        <Button
          text={getString('SIGNUP')}
          disabled={loading}
          color="info"
          onPress={handleSignUp}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default SignIn;
