import '@expo/match-media';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect, useState} from 'react';
import Icons from '../src/utils/Icons';
import RootProvider from '../src/providers';
import {Slot, Navigator} from 'expo-router';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useAssets} from 'expo-asset';
import {useFonts} from 'expo-font';
import styled, {css} from '@emotion/native';
import RootNavigator from '../src/uis/RootNavigator';
import {TabRouter} from '@react-navigation/native';
import Header from '../src/uis/Header';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import {useDooboo} from 'dooboo-ui';
import {supabase} from '../src/supabase';
import {Session, User} from '@supabase/supabase-js';
import SignIn from './signIn';

SplashScreen.preventAutoHideAsync();

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.default};

  flex-direction: column-reverse;

  ${({theme: {isMobile}}) =>
    !isMobile &&
    css`
      flex-direction: row;
    `}
`;

const NavigatorWrapper = styled.View``;

const Contents = styled.View`
  flex: 1;
  align-self: stretch;
`;

function App(): React.ReactElement | null {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('dooboo-ui/uis/Icon/doobooui.ttf'),
  });

  const onIos = Platform.OS === 'ios';
  const onMobile = Platform.OS === 'android' || Platform.OS === 'ios';
  const [session, setSession] = useState<Session | null>(null);

  const {
    media: {isPortrait},
  } = useDooboo();

  const insets = useSafeAreaInsets();
  const [assets] = useAssets(Icons);
  const [appIsReady, setAppIsReady] = useState(false);

  const safeAreaStyles: StyleProp<ViewStyle> = [
    onMobile && {paddingTop: Math.max(insets.top, 20)},
    onMobile && isPortrait && {paddingBottom: Math.min(insets.bottom, 10)},
    !isPortrait &&
      onIos && {
        paddingLeft: Math.max(insets.left, 8),
      },
  ];

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    if (assets && fontsLoaded) {
      SplashScreen.hideAsync();
    }

    prepare();
  }, [assets, fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {session?.user ? (
        <Navigator router={TabRouter} initialRouteName="/">
          <StatusBarBrightness />
          <Container onLayout={onLayoutRootView} style={safeAreaStyles}>
            <NavigatorWrapper>
              <RootNavigator />
            </NavigatorWrapper>
            <Contents>
              <Header />
              <Slot />
            </Contents>
          </Container>
        </Navigator>
      ) : (
        <SignIn />
      )}
    </SafeAreaProvider>
  );
}

function ProviderWrapper(): React.ReactElement {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default gestureHandlerRootHOC(ProviderWrapper);
