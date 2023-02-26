import {StyleSheet, View, Alert, Text} from 'react-native';
import type {ReactElement} from 'react';
import {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {supabase} from '../src/supabase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});

const SignIn = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async (): Promise<void> => {
    setLoading(true);

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setEmail('');
    setPassword('');
    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  };

  const signUpWithEmail = async (): Promise<void> => {
    setLoading(true);

    const {error} = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Example</Text>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={'Sign in'}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={'Sign up'}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </View>
  );
};

export default SignIn;
