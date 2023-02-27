import type {StyleProp, TextStyle} from 'react-native';

import type {FC} from 'react';

export interface User {
  email: string;
}

interface IconProps {
  style?: StyleProp<TextStyle>;
  width?: number | string;
  height?: number | string;
  children?: never;
}

export type IconType = FC<IconProps>;
