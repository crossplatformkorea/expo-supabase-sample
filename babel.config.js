module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      "babel-preset-expo", '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {runtime: 'automatic', importSource: '@emotion/react'},
      ],
    ],
    plugins: [
      require.resolve("expo-router/babel"),
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
