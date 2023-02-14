import React, {useCallback, useMemo} from 'react';
import styled, {css} from '@emotion/native';
import {Link} from 'expo-router';
import {Icon, useDooboo} from 'dooboo-ui';
import type {IconName} from 'dooboo-ui';
import {Body1} from './Typography';
import type {StyleProp, ViewStyle} from 'react-native';
import {useWindowDimensions} from 'react-native';

const ContentWrapper = styled.View`
  border-color: ${({theme}) => theme.text.basic};
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-radius: 2px;
  blur-radius: 3px;
  spread-radius: rgba(0, 0, 0, 0.04);
  elevation: 1;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* For desktop and tablet */
  ${({theme: {isMobile}}) =>
    !isMobile &&
    css`
      height: 100%;
      width: 160px;
      font-size: 18px;
      border-right-width: 1px;
      border-top-width: 0px;

      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    `}

  /* For tablet only */
  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      width: 50px;
      height: 100%;
      border-right-width: 1px;
    `}
`;

const NavHeader = styled.View`
  width: 100%;
  height: 48px;
  padding-left: 24px;

  flex-direction: row;
  align-items: center;

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      padding-left: 0px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `};
`;

const NavWrapper = styled.View`
  padding: 24px 30px 24px 30px;
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      padding: 24px 0px 0px 0px;
      margin-left: 24px;

      flex-direction: column;
      align-items: flex-start;
    `};

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      padding: 24px 0px 0px 0px;

      flex-direction: column;
      align-items: center;
    `};
`;

const StyledLink = styled(Link)<{nthChild?: number}>`
  font-size: 14px;
  color: ${({theme}) => theme.text.basic};

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      margin-bottom: 30px;
      font-size: 18px;
    `};

  ${({theme: {isTablet}}) =>
    isTablet &&
    css`
      margin-bottom: 30px;
      font-size: 18px;
    `};
`;

export default function RootNavigator(): React.ReactElement {
  const {
    media: {isMobile, isDesktop},
  } = useDooboo();
  const {height: windowHeight} = useWindowDimensions();

  const data: Array<{route: string; iconName: IconName; text: string}> =
    useMemo(
      () => [
        {route: '/', iconName: 'HomeAlt', text: 'Home'},
        {route: '/temp', iconName: 'ExploreAlt', text: 'Explore'},
        {route: '/temp', iconName: 'Add', text: 'Create'},
        {route: '/temp', iconName: 'Search', text: 'Search'},
      ],
      [],
    );

  const SectionItem = useCallback(
    ({
      href,
      content,
      iconName,
      style,
      nthChild,
    }: {
      href: string;
      content: string;
      iconName: IconName;
      nthChild?: number;
      style?: StyleProp<ViewStyle>;
    }) => {
      return (
        <StyledLink href={href} style={style} nthChild={nthChild}>
          <Icon name={iconName} size={16} />
          {isDesktop && <Body1 style={{marginLeft: 8}}>{content}</Body1>}
        </StyledLink>
      );
    },
    [isDesktop],
  );

  return (
    <ContentWrapper>
      {!isMobile ? (
        <NavHeader>
          <Icon name="Dooboo" size={16} />
          {isDesktop && <Body1 style={{marginLeft: 8}}>dooboo</Body1>}
        </NavHeader>
      ) : null}

      <NavWrapper style={!isMobile && {height: windowHeight - 48}}>
        {data.map(({route, iconName, text}, i) => (
          <SectionItem
            key={`${route}-${i}`}
            href={route}
            iconName={iconName}
            content={text}
            nthChild={i}
          />
        ))}
        <SectionItem
          href="/"
          iconName="Menu"
          content="Menu"
          style={!isMobile && {marginTop: 'auto'}}
        />
      </NavWrapper>
    </ContentWrapper>
  );
}
