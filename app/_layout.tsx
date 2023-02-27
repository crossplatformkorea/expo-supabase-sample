import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect, useState} from 'react';
import Icons from '../src/utils/Icons';
import RootProvider from '../src/providers';
import {Slot, useRouter, useSegments} from 'expo-router';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {useAssets} from 'expo-asset';
import {useFonts} from 'expo-font';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import type {StyleProp, ViewStyle} from 'react-native';
import {Platform} from 'react-native';
import {useAppContext} from '../src/providers/AppProvider';
import {useAuthStateChange} from '../src/hooks/useAuthStateChange';

SplashScreen.preventAutoHideAsync();

function App(): React.ReactElement | null {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('dooboo-ui/uis/Icon/doobooui.ttf'),
  });
  const onMobile = Platform.OS === 'android' || Platform.OS === 'ios';
  const router = useRouter();
  const segments = useSegments();

  const {
    state: {user},
  } = useAppContext();

  const insets = useSafeAreaInsets();
  const [assets] = useAssets(Icons);
  const [appIsReady, setAppIsReady] = useState(false);

  useAuthStateChange();

  const safeAreaStyles: StyleProp<ViewStyle> = [
    onMobile && {paddingTop: Math.max(insets.top, 20)},
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
    if (!appIsReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      router.replace('/');
    }

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    }
  }, [user, segments, router, appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} style={safeAreaStyles}>
      <StatusBarBrightness />
      <Slot />
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
