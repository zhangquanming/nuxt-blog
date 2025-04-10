module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    Vue: true,
    Vuex: true,
  },
  // add your custom rules here
  rules: {
    "import/order": "off",
    "vue/comment-directive": "off",
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    "max-len":[1, 180],
    'prettier/prettier': [
      'error',
      {
        printWidth: 180 // 换行字符串阈值
      },
    ],
  }
}
