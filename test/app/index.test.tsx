import {render, renderHook, waitFor} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../utils/testUtils';

import type {ReactElement} from 'react';
import {useState, useEffect} from 'react';
import type {RenderAPI} from '@testing-library/react-native';
import renderer, {act} from 'react-test-renderer';
import {supabase} from '../../src/supabase';
import type {User} from '@supabase/supabase-js';
import {Alert} from 'react-native';
import type {DataType} from '../../app/(app)';
import Intro from '../../app/(app)';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
    jest.clearAllMocks();
  });

  const mockGetUser = jest.fn();
  const mockSelect = jest.fn();

  jest.mock('../../src/supabase', () => ({
    supabase: {
      auth: {
        getUser: mockGetUser,
      },
      from: () => ({
        select: mockSelect,
      }),
    },
  }));

  jest.mock('react-native', () => ({
    Alert: {
      alert: jest.fn(),
    },
  }));

  it('renders users when API call succeeds', async () => {
    const {result} = renderHook(() => {
      const [userState, setUserState] = useState<User | null>(null);
      const [dataList, setDataList] = useState<DataType[]>([]);

      useEffect(() => {
        const getUser = async (): Promise<void> => {
          const {
            data: {user},
          } = await supabase.auth.getUser();
          mockGetUser.mockResolvedValueOnce({data: {user}});
          setUserState(user);
        };

        const getData = async (): Promise<void> => {
          const data: DataType[] = [
            {
              id: 1,
              created_at: 'string;',
              content: 'string;',
              title: 'string;',
              image: {
                url: 'string;',
                path: 'string;',
              },
            },
          ]; // mock data
          mockSelect.mockResolvedValueOnce({data});

          const {data: resData, error} = await supabase
            .from('review')
            .select('*');

          if (error) {
            Alert.alert('Error', error.message);

            return;
          }

          //@ts-ignore
          setDataList((prev) => [...prev, ...resData]);
        };

        getUser();
        getData();
      }, []);

      return {userState, dataList};
    });

    await act(async () => {
      await Promise.resolve(); // Let useEffect hook run first
    });

    expect(mockGetUser).toHaveBeenCalledTimes(1);
    expect(mockSelect).toHaveBeenCalledTimes(1);
    expect(result.current.userState).toEqual({id: 1, name: 'test user'});
    expect(result.current.dataList).toEqual([{id: 1, name: 'test data'}]);
    expect(Alert.alert).not.toHaveBeenCalled();
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

describe('[Intro] Interaction', () => {
  // const bottomSheetRender = render(<RBSheet />);
  // const mockSetState = jest.spyOn(React, 'useState');
  // const bottomSheet = bottomSheetRender.queryByTestId('bottom-sheet');
  // const open = jest.fn();
  // it('should simulate login when button has clicked', () => {
  //   testingLib = render(component);
  //   jest.useFakeTimers();
  //   const button = testingLib.getByTestId('open-bottom-sheet');
  //   act(() => {
  //     fireEvent.press(button);
  //     jest.runOnlyPendingTimers();
  //   });
  //   jest.spyOn(RBSheet.prototype, 'open').mockImplementation((): any => ({
  //     open,
  //   }));
  //   expect(bottomSheetRender).toMatchSnapshot();
  //   expect(mockSetState).toHaveBeenCalledWith(false);
  //   expect(bottomSheet?.instance.open).toHaveBeenCalled();
  // });
});
