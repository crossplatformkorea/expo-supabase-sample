import styled, {css} from '@emotion/native';

export const Heading1 = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.text.basic};

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 20px;
    `}
`;

export const Body1 = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.text.basic};

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      font-size: 18px;
    `}
`;

export const Body3 = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.text.basic};
`;
