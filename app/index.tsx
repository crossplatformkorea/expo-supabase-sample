import {Button} from 'dooboo-ui';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {ReactElement} from 'react';
import {useEffect, useRef, useState} from 'react';

import styled from '@emotion/native';
import {Heading1} from '../src/uis/Typography';
import type {Database} from '../src/supabase';
import {supabase} from '../src/supabase';
import type {User} from '@supabase/supabase-js';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {decode} from 'base64-arraybuffer';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  margin-bottom: 35px;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.View``;

type Props = {};

export type DataType = Database['public']['Tables']['review']['Row'];

function Intro({}: Props): ReactElement {
  const [userState, setUserState] = useState<User | null>(null);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const refRBSheet = useRef<RBSheet>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(0);

  const [uploading, setUploading] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      setUserState(user);
    };

    const getData = async (): Promise<void> => {
      const {data, error} = await supabase.from('review').select('*');
      if (error) {
        Alert.alert('Error', error.message);

        return;
      }

      setDataList(data as DataType[]);
    };

    getUser();
    getData();
  }, []);

  const createData = async (): Promise<void> => {
    const {data, error} = await supabase
      .from('review')
      .insert({
        title,
        content,
      })
      .select('*');

    if (error) {
      Alert.alert('Error', error.message);

      return;
    }

    setDataList((prev) => [...prev, ...data]);
    refRBSheet.current?.close();
    setTitle('');
    setContent('');
  };

  const updateData = async (id: number): Promise<void> => {
    const {data, error} = await supabase
      .from('review')
      .update({title, content})
      .eq('id', id)
      .select('*');

    if (error) {
      Alert.alert('Error', error.message);

      return;
    }

    setDataList((prev) =>
      prev.map((item) => (item.id === id ? data[0] : item)),
    );
    refRBSheet.current?.close();
    setTitle('');
    setContent('');
  };

  const deleteData = async (id: number): Promise<void> => {
    const {error} = await supabase.from('review').delete().eq('id', id);
    if (error) {
      Alert.alert('Error', error.message);

      return;
    }

    setDataList((prev) => prev.filter((item) => item.id !== id));
  };

  const uploadAvatar = async (id: number, index: number): Promise<void> => {
    if (!status?.granted) {
      requestPermission();

      return;
    }

    try {
      setUploading(true);

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const filePath = `profile/${Math.random()}.jpg`;

        const {error: uploadError} = await supabase
          .from('review')
          .update({
            image: {
              url: result.assets ? result.assets[0].uri : '',
              path: filePath,
            },
          })
          .eq('id', id);

        if (uploadError) {
          Alert.alert('Error', uploadError.message);

          return;
        }

        setDataList(
          dataList.map((item, i) => {
            if (index === i) {
              return {
                ...item,
                image: {
                  url: result.assets ? result.assets[0].uri : '',
                  path: filePath,
                },
              };
            }

            return item;
          }),
        );

        const photo = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };
        const formData = new FormData();
        //@ts-ignore
        formData.append('file', photo);
        // const fileExt = result.assets[0].fileName?.split('.').pop();

        let {error} = await supabase.storage
          .from('avatars')
          .upload(filePath, decode(result.assets[0].base64 ?? ''), {
            contentType: result.assets[0].type,
          });

        if (error) {
          throw error;
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setUploading(false);
    }
  };

  const deleteAvatar = async (
    path: string,
    id: number,
    index: number,
  ): Promise<void> => {
    try {
      const {error} = await supabase.storage.from('avatars').remove([path]);
      await supabase
        .from('review')
        .update({
          image: {
            url: '',
            path: '',
          },
        })
        .eq('id', id)
        .select('*');

      if (error) {
        Alert.alert('Error', error.message);

        return;
      }

      setDataList(
        dataList.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              image: {
                url: '',
                path: '',
              },
            };
          }

          return item;
        }),
      );
    } catch (e) {
      console.log(e, 'e');
    }
  };

  return (
    <>
      <Container>
        <ContentWrapper>
          <Heading1 style={{marginTop: 10}}>{userState?.email}</Heading1>
        </ContentWrapper>
        <FlatList
          style={{width: '100%'}}
          data={dataList}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                setTitle(item.title);
                setContent(item.content);
                setIsUpdate(true);
                setUpdateId(item.id);
                refRBSheet.current?.open();
              }}
              style={{
                borderBottomWidth: 1,
                marginTop: 10,
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    width: Dimensions.get('window').width - 120,
                  }}
                >
                  <Text>title: {item.title}</Text>
                  <Text>content: {item.content}</Text>
                </View>
                <View style={{alignItems: 'center', marginLeft: 20}}>
                  <TouchableOpacity
                    onPress={() => uploadAvatar(item.id, index)}
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderRadius: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item.image?.url ? (
                      <Image
                        source={{uri: item.image?.url}}
                        style={{width: 60, height: 60, borderRadius: 60}}
                      />
                    ) : (
                      <Text style={{textAlign: 'center'}}>no image</Text>
                    )}
                  </TouchableOpacity>
                  {item.image?.path ? (
                    <TouchableOpacity
                      onPress={() =>
                        deleteAvatar(item.image?.path!, item.id, index)
                      }
                      style={{
                        padding: 5,
                        borderRadius: 2,
                        backgroundColor: 'black',
                        marginTop: 5,
                      }}
                    >
                      <Text style={{color: 'white'}}>delete</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              <Button
                style={{marginHorizontal: 20, marginTop: 20}}
                text={'delete'}
                onPress={() => deleteData(item.id)}
              />
            </Pressable>
          )}
        />
        <View style={{paddingHorizontal: 20, width: '100%', marginTop: 20}}>
          <Button
            testID="open-bottom-sheet"
            style={{marginBottom: 20}}
            text="Create Data"
            onPress={() => {
              setIsUpdate(false);
              refRBSheet.current?.open();
            }}
          />
          <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
        </View>
      </Container>

      {/* @ts-ignore */}
      <RBSheet
        testID="bottom-sheet"
        ref={refRBSheet}
        onOpen={() => {}}
        onClose={() => {
          setTitle('');
          setContent('');
        }}
        closeOnDragDown
        dragFromTopOnly
        height={400}
        animationType="fade"
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 20,
            paddingBottom: 40,
          },
        }}
      >
        <View style={{justifyContent: 'center', flex: 1}}>
          <Input
            label="Title"
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="title"
            autoCapitalize={'none'}
          />
          <Input
            label="Content"
            onChangeText={(text) => setContent(text)}
            value={content}
            placeholder="content"
            autoCapitalize={'none'}
          />
          <Button
            testID="CREATE_DATA"
            style={{marginTop: 20}}
            text={isUpdate ? 'Update Data' : 'Create Data'}
            onPress={isUpdate ? () => updateData(updateId) : createData}
          />
        </View>
      </RBSheet>
    </>
  );
}

export default Intro;
