import '@emotion/react';
import type {DoobooTheme} from 'dooboo-ui';
import type {CustomAppTheme} from './theme';

type AllTheme = CustomAppTheme & DoobooTheme;

declare module '@emotion/react' {
  export interface Theme extends AllTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}

declare module 'dooboo-ui' {
  export interface DoobooTheme extends AllTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
