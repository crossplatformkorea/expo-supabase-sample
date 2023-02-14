import {Button, Icon, useDooboo} from 'dooboo-ui';

import styled from '@emotion/native';
import {useRouter} from 'expo-router';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {};

function Page({}: Props): React.ReactElement {
  const {theme} = useDooboo();
  const router = useRouter();

  return (
    <Container>
      <Button
        testID="btn-back"
        onPress={() => router.back()}
        startElement={
          <Icon
            name="ChevronLeftAlt"
            size={16}
            color={theme.text.contrast}
            style={{
              marginRight: 12,
            }}
          />
        }
        text={'Back'}
      />
    </Container>
  );
}

export default Page;
