---
marp: true
---
# Expo supabase example with expo router


## Create Data
```

```

## Fetch Data

## Update Data

## Delete Data
<!-- # Expo typescript starter with expo router

[![CI](https://github.com/dooboolab/dooboo-expo-router/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab/dooboo-expo-router/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/dooboolab/dooboo-expo-router/branch/main/graph/badge.svg)](https://codecov.io/gh/dooboolab/dooboo-expo-router)

> Specification

- [react-native](https://github.com/facebook/react-native)
- [expo](https://github.com/expo/expo)
- [expo-router](https://expo.github.io/router/docs)
- [typescript](https://github.com/Microsoft/TypeScript)
- [localization](https://github.com/stefalda/ReactNativeLocalization)
- [emotion](https://emotion.sh)
- [dooboo-ui](https://github.com/dooboolab/dooboo-ui)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [@testing-library/react-native](https://github.com/testing-library/native-testing-library)
- [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library)
- [react-hook](https://reactjs.org/docs/hooks-intro.html)
- [prettier](https://prettier.io)

### Gain points

```
1. Sample of context-api with `react-hook` (`useContext`).
2. Know how to structure react native app with typescript.
3. Know how to navigate between screens with `expo-router`.
4. Know how to write test code with `testing-library`.
5. Know how to `lint` your project with `eslint` for both `ts` and maybe some `js`.
6. Know how to localize your project.
```

### INSTALL

```
npm install && npm start
// or
yarn && yarn start
```

### Structures

```text
app/
├─ .doobooo // necessary if using dooboo-cli
├─ .expo
├─ assets
│  └─ icons // app icons
│  └─ images // app images like background images
├─ app/
├─ assets/
├─ node_modules/
├─ src/
│  └─ apis
│  └─ components
│     └─ navigations
│     └─ screen
│     └─ shared
│  └─ contexts
│  └─ utils
├─ test/
├─ .buckconfig
├─ .flowconfig
├─ .gitattributes
├─ .gitignore
├─ .watchmanconfig
├─ app.json
├─ babel.config.js
├─ index.js
├─ jest.config.js
├─ package.json
├─ README.md
├─ STRINGS.js
├─ tsconfig.json
└─ tslint.json
```

### Running the project

Running the project is as simple as running

```sh
npm run start
```

This runs the `start` script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files.
Typically the server runs at `http://localhost:8080`, but should be automatically opened for you.

## Testing the project

Testing is also just a command away:

```sh
npm test
```

> Result

```
> yarn test

PASS  test/app/index.test.tsx (6.378 s)
PASS  test/src/uis/Button.test.tsx
PASS  test/app/temp.test.tsx
PASS  src/apis/__tests__/sample.test.ts

Test Suites: 4 passed, 4 total
Tests:       18 passed, 18 total
```

### Writing tests with Jest

We've created test examples with jest-ts in `test` dir. We organize the tests as organized in [flutter repo](https://github.com/flutter/flutter/tree/master/packages/flutter/test). This way we know where the test files exist.

### Localization

We've defined Localization strings in `STRINGS.ts` which is in root dir.
We used [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization) for translation.

```ts
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// import en from './assets/langs/en.json';
const en = {
  HELLO: 'Hello',
  LOGIN: 'Login',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  SIGNUP: 'SIGN UP',
  FORGOT_PW: 'Forgot password?',
  NAVIGATE: 'Navigate',
  CHANGE_THEME: 'Change theme',
};

// import ko from './assets/langs/ko.json';
const ko = {
  HELLO: '안녕하세요',
  LOGIN: '로그인',
  EMAIL: '이메일',
  PASSWORD: '패스워드',
  SIGNUP: '회원가입',
  FORGOT_PW: '비밀번호를 잊어버리셨나요?',
  NAVIGATE: '이동하기',
  CHANGE_THEME: '테마변경',
};

i18n.fallbacks = true;
i18n.translations = { en, ko };
i18n.locale = Localization.locale;

export const getString = (param: string, mapObj?: object) => {
  if (mapObj) {
    i18n.t(param, mapObj);
  }
  return i18n.t(param);
};
``` -->
