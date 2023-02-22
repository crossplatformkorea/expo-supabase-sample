import {act, fireEvent, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../utils/testUtils';

import {Button} from 'dooboo-ui';
import * as expoRouter from 'expo-router';
import Intro from '../../app/index';
import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
  });

  it('should render outer component and snapshot matches', () => {
    const json = renderer.create(component).toJSON();

    expect(json).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });

  it('should render [isLoading] status', () => {
    props = createTestProps({
      isLoading: true,
    });

    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });

  it('should render [isDisabled] status', () => {
    props = createTestProps({
      isDisabled: true,
    });

    component = createTestElement(<Intro {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});

describe('[Intro] Interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;

  it('should simulate login when button has clicked', () => {
    testingLib = render(component);
    rendered = renderer.create(component);
    root = rendered.root;

    jest.useFakeTimers();

    const buttons = root.findAllByType(Button);

    const button = testingLib.getByTestId('btn-login');

    act(() => {
      fireEvent.press(button);
      jest.runOnlyPendingTimers();
    });

    expect(buttons[0].props.loading).toEqual(false);
  });

  it('should navigate when button has clicked', () => {
    const push = jest.fn();

    jest.spyOn(expoRouter, 'useRouter').mockImplementation((): any => ({
      push,
    }));

    testingLib = render(component);
    fireEvent.press(testingLib.getByTestId('btn-navigate'));
    expect(push).toHaveBeenCalledWith('/temp');
  });

  // eslint-disable-next-line jest/expect-expect
  it('should change theme when button has clicked', () => {
    testingLib = render(component);

    fireEvent.press(testingLib.getByTestId('btn-theme'));
  });
});
