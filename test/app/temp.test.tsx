import {act, fireEvent, render} from '@testing-library/react-native';

import * as expoRouter from 'expo-router';
import type {ReactElement} from 'react';
import Temp from '../../app/temp';
import type {RenderAPI} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../utils/testUtils';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Temp] render', () => {
  props = createTestProps({
    route: {
      params: {
        param: 'GO BACK',
      },
    },
  });

  component = createTestElement(<Temp {...props} />);

  it('renders without crashing', () => {
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    props = createTestProps({
      route: {
        params: {
          param: 'GO BACK',
        },
      },
    });

    component = createTestElement(<Temp {...props} />, 'dark');
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});

describe('[Temp] Interaction', () => {
  let renderResult: RenderAPI;
  const back = jest.fn();

  beforeEach(() => {
    jest.spyOn(expoRouter, 'useRouter').mockImplementation((): any => ({
      back,
    }));
    renderResult = render(component);
  });

  it('should simulate [onClick] when button has been clicked', () => {
    const btnInstance = renderResult.getByTestId('btn-back');

    act(() => {
      fireEvent.press(btnInstance);
    });

    expect(back).toHaveBeenCalled();
  });
});
