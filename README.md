# Expo supabase example with expo router

> Specification
- [supabase](https://supabase.com/)
- [vitest](https://vitest.dev/)
- [react-native](https://github.com/facebook/react-native)
- [expo](https://github.com/expo/expo)
- [expo-router](https://expo.github.io/router/docs)

## DEMO

| login | create |
| ----- | ------ |
| <img src=https://user-images.githubusercontent.com/73378472/220524044-ce92b43a-d0ea-4cf0-938b-7a01e575b6ff.gif width="200"> | <img src=https://user-images.githubusercontent.com/73378472/220524325-6ef92643-c208-40bb-97a5-f685bc8ffc8e.gif width="200"> |

| update & delete | image upload & delete |
| ----- | ------ |
| <img src=https://user-images.githubusercontent.com/73378472/220526290-819220a1-aab8-443d-9ae8-0f337d7da11e.gif width="200"> | <img src=https://user-images.githubusercontent.com/73378472/220526294-60fe7104-7c28-411d-bd31-f803bf53aa21.gif width="200"> |


## SETTING

프로젝트 이동시 [supabase](https://supabase.com/) 에서 프로젝트 생성 후 `supabaseUrl.ts` 에 `supabaseUrl` 와 `supabaseAnonKey` 를 넣어주세요.
```js
const supabaseUrl = 'your supabase url';
const supabaseAnonKey = 'your supabase anon key';
```
- `Table`은 자동생성이 안되기 때문에 직접 생성해야합니다. example 에서는
`review` 이름 테이블을 사용합니다.
- RLS 정책을 disabled 시키거나 policy를 허용해야 정상적으로 사용할 수 있습니다.

```js
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### TYPE
```js
export interface Database {
    public: {
      Tables: {
        review: {
          Row: {
            id: number;
            created_at: string;
            content:string;
            title:string;
            image?:{
              url:string;
              path:string;
            }
          } // The data expected to be returned from a "select" statement.
          Insert: {
           ...
          } // The data expected passed to an "insert" statement.
          Update: {
          ...
          } // The data expected passed to an "update" statement.
        },
        countries:{

        }
      }
    }
  }
```
- 테이블 데이터의 타입과 생성, 업데이트, 삭제 시 타입을 지정 할 수 있습니다.

## DATABASE
https://supabase.com/docs/reference/javascript/select

### Create Data
```js
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
```

### Fetch Data
```js
const {data, error} = await supabase.from('review').select('*');
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }
```
### Update Data
```js
 const {data, error} = await supabase
      .from('review')
      .update({title, content})
      .eq('id', id)
      .select('*');
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
```
### Delete Data
```js
const {error} = await supabase.from('review').delete().eq('id', id);
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
```


## STORAGE
https://supabase.com/docs/reference/javascript/storage-createbucket

### Create a bucket
```js
const { data, error } = await supabase
  .storage
  .createBucket('avatars')
```
### UPLOAD
```js
const {error} = await supabase.storage
          .from('avatars')
          .upload(filePath, decode(result.assets[0].base64 ?? ''), {
            contentType: result.assets[0].type,
          });
        if (error) {
          throw error;
        }
```
- React Native의 경우 Blob, File 또는 FormData를 사용하면 Storage에 업로드 할 수 없기때문에 `base64` 방법을 사용해야합니다.
https://supabase.com/docs/reference/javascript/storage-from-upload

### DELETE
```js
const {error} = await supabase.storage.from('avatars').remove([path]);
```
