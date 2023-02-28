import {render, waitFor} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../utils/testUtils';

import type {ReactElement} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import Intro from '../../app/(app)';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
  });

  it('should render mask', async () => {
    testingLib = render(component);

    const bottomSheet = testingLib.queryByTestId('bottom-sheet');
    await waitFor(() => expect(bottomSheet).toBeDefined());
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
