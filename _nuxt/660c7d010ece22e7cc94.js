(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{229:function(n,e){n.exports={body:"Seperti kita tau bersama bahwa bawaan dari project Nuxt akan membuat kode dengan basis JavaScript Vanilla. Sedangkan dengan makin maraknya penggunaan TypeScript di kalangan para pengembang JavaScript membuat saya pribadi ikut kepincut untuk mengimplementasikan penggunaan TypeScript pada projek kode sumber terbuka saya.\n\nBerikut hal-hal yang saya kerjakan dalam proses migrasi tersebut:\n\n## Menambahkan tsconfig.json\n\n```javascript\n{\n  \"compilerOptions\": {\n    \"target\": \"es5\",\n    \"module\": \"esnext\",\n    \"moduleResolution\": \"node\",\n    \"lib\": [\"esnext\", \"esnext.asynciterable\", \"dom\"],\n    \"esModuleInterop\": true,\n    \"experimentalDecorators\": true,\n    \"resolveJsonModule\": true,\n    \"allowJs\": true,\n    \"sourceMap\": true,\n    \"strict\": true,\n    \"noImplicitAny\": false,\n    \"strictNullChecks\": false,\n    \"noEmit\": true,\n    \"baseUrl\": \".\",\n    \"paths\": {\n      \"~/*\": [\"./*\"],\n      \"@/*\": [\"./*\"]\n    },\n    \"types\": [\"@types/jest\", \"@types/node\", \"@nuxt/vue-app\"]\n  },\n  \"exclude\": [\n    \"nuxt.config.ts\",\n    \"node_modules/**\",\n    \"dist/**\",\n    \".nuxt/**\",\n    \"tests/**\"\n  ]\n}\n```\n\nUntuk menambahkan berkas ini, saya juga perlu menambahkan beberapa dependencies berikut:\n\n```javascript\n{\n  \"@nuxt/typescript\": \"2.7.1\",\n  \"@types/jest\": \"24.0.13\",\n  \"@types/node\": \"11.13.10\",\n  \"typescript\": \"3.4.5\"\n}\n```\n\n## Perbarui eslintrc.js\n\n```javascript\nmodule.exports = {\n  plugins: ['@typescript-eslint'],\n  parserOptions: {\n    parser: '@typescript-eslint/parser'\n  },\n  extends: [\n    '@nuxtjs',\n    'plugin:nuxt/recommended',\n  ],\n  rules: {\n    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-unused-vars': 'off',\n    'vue/component-name-in-template-casing': [\n      'error',\n      'PascalCase',\n      {\n        ignores: ['nuxt', 'nuxt-link', 'nuxt-child', 'no-ssr']\n      }\n    ],\n    'vue/html-closing-bracket-newline': [\n      'error',\n      {\n        singleline: 'never',\n        multiline: 'never'\n      }\n    ]\n  }\n}\n```\n\nDan menambahkan beberapa dependencies berikut:\n\n```javascript\n{\n  \"@nuxtjs/eslint-config\": \"0.0.1\",\n  \"@typescript-eslint/eslint-plugin\": \"1.9.0\"\n}\n```\n\n## Ubah nuxt.config.js menjadi nuxt.config.ts\n\nUbah ekstensi file dan buat sedikit perubahan menjadi seperti berikut:\n\n```javascript\nimport NuxtConfiguration from '@nuxt/config'\nimport {\n  Configuration as WebpackConfiguration\n} from 'webpack'\n\nconst config: NuxtConfiguration = {\n  mode: 'universal',\n  head: {},\n  build: {\n    extend(config: WebpackConfiguration, ctx) {\n    }\n  }\n}\n\nexport default config\n```\n\n## Refactor Vuex Store\n\nKarena hampir semua komponen dalam projek saya telah menggunakan Vuex Store maka dari itu saya meletakan hal ini sebagai yang pertama untuk saya refactor sebelum melakukan refactor pada komponen. Untuk menggunakan Vuex dengan TypeScript terdapat sedikit perubahan dibandingkan ketika menggunakan JavaScript biasa, berikut perubahan yang saya kerjakan:\n\n### Classic Store\n\nPada projek ini saya masih menggunakan Classic Store yang mana sebenarnya sudah deprecated dan akan di remove pada Nuxt v3 kedepannya, berikut classic store yang saya buat dalam berkas `store/index.ts`:\n\n```javascript\nimport Vuex from 'vuex'\n\nimport { state } from './state'\nimport { mutations } from './mutations'\nimport { actions } from './actions'\n\nconst createStore = () => {\n  return new Vuex.Store({\n    state: state(),\n    mutations,\n    actions\n  })\n}\n\nexport default createStore\n```\n\n### State\n\nPada berkas `state.ts` saya membuat interface yang menjadi type definitions dari state yang akan dibuat dan membuat state dengan berbagai initial state yang sudah dibuat seperti contoh berikut:\n\n```javascript\nexport interface StateType {\n  isShowSidebar: boolean,\n}\n\n// initial state\nexport const state = (): StateType => ({\n  isShowSidebar: false\n})\n```\n\n### Mutations\n\nVuex sendiri sudah menyediakan dukungan untuk TypeScript dengan memberikan tipe data pada balikan untuk Mutations dengan cukup meng-import `MutationTree` dari Vuex, berikut contoh kodenya:\n\n```javascript\nimport { MutationTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const mutations: MutationTree<StateType> = {\n  [Types.SET_SHOW_SIDEBAR](state: StateType, data: boolean) {\n    state.isShowSidebar = data\n  }\n}\n```\n\n### Actions\n\nUntuk actions sendiri hampir mirip dengan mutations yang mana sudah disediakan tipe data dari Vuex, seperti contoh kode berikut:\n\n\n```javascript\nimport { ActionTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const actions: ActionTree<StateType, StateType> = {\n  setShowSidebar({ commit }, payload) {\n    commit(Types.SET_SHOW_SIDEBAR, payload)\n  }\n}\n```\n\n## Refactor Komponen\n\nSetelah berhasi melakukan refactor pada Vuex Store, selanjutnya kita akan melakukan refactor pada kode komponen kita agar mendukung TypeScript.\n\nUntuk mendukung TypeScript, kita perlu menambahkan beberapa dependencies baru seperti berikut:\n\n```javascript\n{\n  \"vue-class-component\": \"7.1.0\",\n  \"vue-property-decorator\": \"8.1.1\",\n  \"vuex-class\": \"0.3.2\"\n}\n```\n\nYang paling utama, tentu kita harus mengubah kode dalam single file komponen Vue yang sebelumnya hanya `<script><\/script>` menjadi `<script lang=\"ts\"><\/script>` agar kita bisa mendukung kode TypeScript pada bagian script. Dan berikut contoh layout `default.vue` yang sudah saya refactor menggunakan TypeScript:\n\n```javascript\nimport { Component, Vue } from 'vue-property-decorator'\nimport { State, Mutation, Action } from 'vuex-class'\n\nimport ArrowUpIcon from 'vue-ionicons/dist/js/ios-arrow-dropup-circle'\nimport BaseHeader from '../components/BaseHeader.vue'\nimport BaseSidebar from '../components/BaseSidebar.vue'\nimport BaseToast from '../components/BaseToast.vue'\n\n@Component({\n  components: {\n    BaseHeader,\n    BaseSidebar,\n    BaseToast,\n    ArrowUpIcon\n  }\n})\n\nexport default class DefaultLayout extends Vue {\n  showArrowToTop = false;\n\n  @State settingActiveTheme;\n  @State isShowSidebar;\n\n  @Mutation setShowSidebar;\n\n  @Action initDataFromBrowserStorage;\n  @Action setWebshareSupport;\n\n  hideSidebar(): void {\n    this.setShowSidebar(false)\n  }\n\n  handleScroll(): void {\n    this.showArrowToTop = window.pageYOffset > 2000\n  }\n\n  mounted() {\n    window.addEventListener('scroll', this.handleScroll)\n  }\n\n  beforedestroy() {\n    window.removeEventListener('scroll', this.handleScroll)\n  }\n}\n```\n\nSeperti bisa kalian lihat dari contoh kode diatas, saya menggunakan [vue-property-decorator ↗️](https://github.com/kaorun343/vue-property-decorator) untuk mendefinisikan komponen tersebut serta menggunakan [vuex-class ↗️](https://github.com/ktsn/vuex-class) untuk melakukan binding terhadap Vuex Store yang telah dibuat sebelumnya agar bisa digunakan di dalam komponen. Silakan kunjungi tautan masing-masing untuk mempelajari lebih lanjut mengenai apa saja yang bisa dan tidak bisa kita lakukan dengan `vue-property-decorator` maupun `vuex-class`.\n\n## Refactor Jest Config\n\nUnit test hampir tidak diperlukan perubahan sama sekali selain dari path dan nama file yang kemungkinan besar kita ubah nama dan letaknya. Kita hanya perlu mencocokan konfigurasi Jest agar mendukung TypeScript seperti pada contoh kode berikut:\n\n```javascript\nmodule.exports = {\n  moduleNameMapper: {\n    '^~/(.*)$': '<rootDir>/$1',\n    '^@/(.*)$': '<rootDir>/$1',\n    '^vue$': 'vue/dist/vue.common.js'\n  },\n  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],\n  transform: {\n    '^.+.tsx?$': '<rootDir>/node_modules/ts-jest',\n    '^.+.js$': '<rootDir>/node_modules/babel-jest',\n    '^.+.vue$': '<rootDir>/node_modules/vue-jest'\n  },\n  globals: {\n    'ts-jest': {\n      diagnostics: false\n    }\n  }\n}\n```\n\n## Repository sumber\n\n[🐙 https://github.com/mazipan/quran-offline ↗️](https://github.com/mazipan/quran-offline)\n\n### Demikian artikel kali ini, semoga bermanfaat...",html:"<p>Seperti kita tau bersama bahwa bawaan dari project Nuxt akan membuat kode dengan basis JavaScript Vanilla. Sedangkan dengan makin maraknya penggunaan TypeScript di kalangan para pengembang JavaScript membuat saya pribadi ikut kepincut untuk mengimplementasikan penggunaan TypeScript pada projek kode sumber terbuka saya.</p>\n<p>Berikut hal-hal yang saya kerjakan dalam proses migrasi tersebut:</p>\n<h2>Menambahkan tsconfig.json</h2>\n<pre><code class=\"language-javascript\">{\n  &quot;compilerOptions&quot;: {\n    &quot;target&quot;: &quot;es5&quot;,\n    &quot;module&quot;: &quot;esnext&quot;,\n    &quot;moduleResolution&quot;: &quot;node&quot;,\n    &quot;lib&quot;: [&quot;esnext&quot;, &quot;esnext.asynciterable&quot;, &quot;dom&quot;],\n    &quot;esModuleInterop&quot;: true,\n    &quot;experimentalDecorators&quot;: true,\n    &quot;resolveJsonModule&quot;: true,\n    &quot;allowJs&quot;: true,\n    &quot;sourceMap&quot;: true,\n    &quot;strict&quot;: true,\n    &quot;noImplicitAny&quot;: false,\n    &quot;strictNullChecks&quot;: false,\n    &quot;noEmit&quot;: true,\n    &quot;baseUrl&quot;: &quot;.&quot;,\n    &quot;paths&quot;: {\n      &quot;~/*&quot;: [&quot;./*&quot;],\n      &quot;@/*&quot;: [&quot;./*&quot;]\n    },\n    &quot;types&quot;: [&quot;@types/jest&quot;, &quot;@types/node&quot;, &quot;@nuxt/vue-app&quot;]\n  },\n  &quot;exclude&quot;: [\n    &quot;nuxt.config.ts&quot;,\n    &quot;node_modules/**&quot;,\n    &quot;dist/**&quot;,\n    &quot;.nuxt/**&quot;,\n    &quot;tests/**&quot;\n  ]\n}\n</code></pre>\n<p>Untuk menambahkan berkas ini, saya juga perlu menambahkan beberapa dependencies berikut:</p>\n<pre><code class=\"language-javascript\">{\n  &quot;@nuxt/typescript&quot;: &quot;2.7.1&quot;,\n  &quot;@types/jest&quot;: &quot;24.0.13&quot;,\n  &quot;@types/node&quot;: &quot;11.13.10&quot;,\n  &quot;typescript&quot;: &quot;3.4.5&quot;\n}\n</code></pre>\n<h2>Perbarui eslintrc.js</h2>\n<pre><code class=\"language-javascript\">module.exports = {\n  plugins: ['@typescript-eslint'],\n  parserOptions: {\n    parser: '@typescript-eslint/parser'\n  },\n  extends: [\n    '@nuxtjs',\n    'plugin:nuxt/recommended',\n  ],\n  rules: {\n    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-unused-vars': 'off',\n    'vue/component-name-in-template-casing': [\n      'error',\n      'PascalCase',\n      {\n        ignores: ['nuxt', 'nuxt-link', 'nuxt-child', 'no-ssr']\n      }\n    ],\n    'vue/html-closing-bracket-newline': [\n      'error',\n      {\n        singleline: 'never',\n        multiline: 'never'\n      }\n    ]\n  }\n}\n</code></pre>\n<p>Dan menambahkan beberapa dependencies berikut:</p>\n<pre><code class=\"language-javascript\">{\n  &quot;@nuxtjs/eslint-config&quot;: &quot;0.0.1&quot;,\n  &quot;@typescript-eslint/eslint-plugin&quot;: &quot;1.9.0&quot;\n}\n</code></pre>\n<h2>Ubah nuxt.config.js menjadi nuxt.config.ts</h2>\n<p>Ubah ekstensi file dan buat sedikit perubahan menjadi seperti berikut:</p>\n<pre><code class=\"language-javascript\">import NuxtConfiguration from '@nuxt/config'\nimport {\n  Configuration as WebpackConfiguration\n} from 'webpack'\n\nconst config: NuxtConfiguration = {\n  mode: 'universal',\n  head: {},\n  build: {\n    extend(config: WebpackConfiguration, ctx) {\n    }\n  }\n}\n\nexport default config\n</code></pre>\n<h2>Refactor Vuex Store</h2>\n<p>Karena hampir semua komponen dalam projek saya telah menggunakan Vuex Store maka dari itu saya meletakan hal ini sebagai yang pertama untuk saya refactor sebelum melakukan refactor pada komponen. Untuk menggunakan Vuex dengan TypeScript terdapat sedikit perubahan dibandingkan ketika menggunakan JavaScript biasa, berikut perubahan yang saya kerjakan:</p>\n<h3>Classic Store</h3>\n<p>Pada projek ini saya masih menggunakan Classic Store yang mana sebenarnya sudah deprecated dan akan di remove pada Nuxt v3 kedepannya, berikut classic store yang saya buat dalam berkas <code>store/index.ts</code>:</p>\n<pre><code class=\"language-javascript\">import Vuex from 'vuex'\n\nimport { state } from './state'\nimport { mutations } from './mutations'\nimport { actions } from './actions'\n\nconst createStore = () =&gt; {\n  return new Vuex.Store({\n    state: state(),\n    mutations,\n    actions\n  })\n}\n\nexport default createStore\n</code></pre>\n<h3>State</h3>\n<p>Pada berkas <code>state.ts</code> saya membuat interface yang menjadi type definitions dari state yang akan dibuat dan membuat state dengan berbagai initial state yang sudah dibuat seperti contoh berikut:</p>\n<pre><code class=\"language-javascript\">export interface StateType {\n  isShowSidebar: boolean,\n}\n\n// initial state\nexport const state = (): StateType =&gt; ({\n  isShowSidebar: false\n})\n</code></pre>\n<h3>Mutations</h3>\n<p>Vuex sendiri sudah menyediakan dukungan untuk TypeScript dengan memberikan tipe data pada balikan untuk Mutations dengan cukup meng-import <code>MutationTree</code> dari Vuex, berikut contoh kodenya:</p>\n<pre><code class=\"language-javascript\">import { MutationTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const mutations: MutationTree&lt;StateType&gt; = {\n  [Types.SET_SHOW_SIDEBAR](state: StateType, data: boolean) {\n    state.isShowSidebar = data\n  }\n}\n</code></pre>\n<h3>Actions</h3>\n<p>Untuk actions sendiri hampir mirip dengan mutations yang mana sudah disediakan tipe data dari Vuex, seperti contoh kode berikut:</p>\n<pre><code class=\"language-javascript\">import { ActionTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const actions: ActionTree&lt;StateType, StateType&gt; = {\n  setShowSidebar({ commit }, payload) {\n    commit(Types.SET_SHOW_SIDEBAR, payload)\n  }\n}\n</code></pre>\n<h2>Refactor Komponen</h2>\n<p>Setelah berhasi melakukan refactor pada Vuex Store, selanjutnya kita akan melakukan refactor pada kode komponen kita agar mendukung TypeScript.</p>\n<p>Untuk mendukung TypeScript, kita perlu menambahkan beberapa dependencies baru seperti berikut:</p>\n<pre><code class=\"language-javascript\">{\n  &quot;vue-class-component&quot;: &quot;7.1.0&quot;,\n  &quot;vue-property-decorator&quot;: &quot;8.1.1&quot;,\n  &quot;vuex-class&quot;: &quot;0.3.2&quot;\n}\n</code></pre>\n<p>Yang paling utama, tentu kita harus mengubah kode dalam single file komponen Vue yang sebelumnya hanya <code>&lt;script&gt;&lt;/script&gt;</code> menjadi <code>&lt;script lang=&quot;ts&quot;&gt;&lt;/script&gt;</code> agar kita bisa mendukung kode TypeScript pada bagian script. Dan berikut contoh layout <code>default.vue</code> yang sudah saya refactor menggunakan TypeScript:</p>\n<pre><code class=\"language-javascript\">import { Component, Vue } from 'vue-property-decorator'\nimport { State, Mutation, Action } from 'vuex-class'\n\nimport ArrowUpIcon from 'vue-ionicons/dist/js/ios-arrow-dropup-circle'\nimport BaseHeader from '../components/BaseHeader.vue'\nimport BaseSidebar from '../components/BaseSidebar.vue'\nimport BaseToast from '../components/BaseToast.vue'\n\n@Component({\n  components: {\n    BaseHeader,\n    BaseSidebar,\n    BaseToast,\n    ArrowUpIcon\n  }\n})\n\nexport default class DefaultLayout extends Vue {\n  showArrowToTop = false;\n\n  @State settingActiveTheme;\n  @State isShowSidebar;\n\n  @Mutation setShowSidebar;\n\n  @Action initDataFromBrowserStorage;\n  @Action setWebshareSupport;\n\n  hideSidebar(): void {\n    this.setShowSidebar(false)\n  }\n\n  handleScroll(): void {\n    this.showArrowToTop = window.pageYOffset &gt; 2000\n  }\n\n  mounted() {\n    window.addEventListener('scroll', this.handleScroll)\n  }\n\n  beforedestroy() {\n    window.removeEventListener('scroll', this.handleScroll)\n  }\n}\n</code></pre>\n<p>Seperti bisa kalian lihat dari contoh kode diatas, saya menggunakan <a href=\"https://github.com/kaorun343/vue-property-decorator\">vue-property-decorator ↗️</a> untuk mendefinisikan komponen tersebut serta menggunakan <a href=\"https://github.com/ktsn/vuex-class\">vuex-class ↗️</a> untuk melakukan binding terhadap Vuex Store yang telah dibuat sebelumnya agar bisa digunakan di dalam komponen. Silakan kunjungi tautan masing-masing untuk mempelajari lebih lanjut mengenai apa saja yang bisa dan tidak bisa kita lakukan dengan <code>vue-property-decorator</code> maupun <code>vuex-class</code>.</p>\n<h2>Refactor Jest Config</h2>\n<p>Unit test hampir tidak diperlukan perubahan sama sekali selain dari path dan nama file yang kemungkinan besar kita ubah nama dan letaknya. Kita hanya perlu mencocokan konfigurasi Jest agar mendukung TypeScript seperti pada contoh kode berikut:</p>\n<pre><code class=\"language-javascript\">module.exports = {\n  moduleNameMapper: {\n    '^~/(.*)$': '&lt;rootDir&gt;/$1',\n    '^@/(.*)$': '&lt;rootDir&gt;/$1',\n    '^vue$': 'vue/dist/vue.common.js'\n  },\n  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],\n  transform: {\n    '^.+.tsx?$': '&lt;rootDir&gt;/node_modules/ts-jest',\n    '^.+.js$': '&lt;rootDir&gt;/node_modules/babel-jest',\n    '^.+.vue$': '&lt;rootDir&gt;/node_modules/vue-jest'\n  },\n  globals: {\n    'ts-jest': {\n      diagnostics: false\n    }\n  }\n}\n</code></pre>\n<h2>Repository sumber</h2>\n<p><a href=\"https://github.com/mazipan/quran-offline\">🐙 https://github.com/mazipan/quran-offline ↗️</a></p>\n<h3>Demikian artikel kali ini, semoga bermanfaat...</h3>\n",attributes:{title:"Migrate Nuxt to TypeScript",slug:"migrate-nuxt-to-typescript",date:"2019-05-15",minute2read:10,description:"Story telling about the steps that I worked on when migrating the Nuxt project from using vanilla JavaScript to using TypeScript",categories:["javascript","nuxt","typescript"]},vue:{render:"return function render() { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0) }",staticRenderFns:'return [function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(\'div\',{staticClass:"content-markdown"},[_c(\'p\',[_vm._v("Seperti kita tau bersama bahwa bawaan dari project Nuxt akan membuat kode dengan basis JavaScript Vanilla. Sedangkan dengan makin maraknya penggunaan TypeScript di kalangan para pengembang JavaScript membuat saya pribadi ikut kepincut untuk mengimplementasikan penggunaan TypeScript pada projek kode sumber terbuka saya.")]),_vm._v(" "),_c(\'p\',[_vm._v("Berikut hal-hal yang saya kerjakan dalam proses migrasi tersebut:")]),_vm._v(" "),_c(\'h2\',[_vm._v("Menambahkan tsconfig.json")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("{\\n  \\"compilerOptions\\": {\\n    \\"target\\": \\"es5\\",\\n    \\"module\\": \\"esnext\\",\\n    \\"moduleResolution\\": \\"node\\",\\n    \\"lib\\": [\\"esnext\\", \\"esnext.asynciterable\\", \\"dom\\"],\\n    \\"esModuleInterop\\": true,\\n    \\"experimentalDecorators\\": true,\\n    \\"resolveJsonModule\\": true,\\n    \\"allowJs\\": true,\\n    \\"sourceMap\\": true,\\n    \\"strict\\": true,\\n    \\"noImplicitAny\\": false,\\n    \\"strictNullChecks\\": false,\\n    \\"noEmit\\": true,\\n    \\"baseUrl\\": \\".\\",\\n    \\"paths\\": {\\n      \\"~/*\\": [\\"./*\\"],\\n      \\"@/*\\": [\\"./*\\"]\\n    },\\n    \\"types\\": [\\"@types/jest\\", \\"@types/node\\", \\"@nuxt/vue-app\\"]\\n  },\\n  \\"exclude\\": [\\n    \\"nuxt.config.ts\\",\\n    \\"node_modules/**\\",\\n    \\"dist/**\\",\\n    \\".nuxt/**\\",\\n    \\"tests/**\\"\\n  ]\\n}\\n")])]),_vm._v(" "),_c(\'p\',[_vm._v("Untuk menambahkan berkas ini, saya juga perlu menambahkan beberapa dependencies berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("{\\n  \\"@nuxt/typescript\\": \\"2.7.1\\",\\n  \\"@types/jest\\": \\"24.0.13\\",\\n  \\"@types/node\\": \\"11.13.10\\",\\n  \\"typescript\\": \\"3.4.5\\"\\n}\\n")])]),_vm._v(" "),_c(\'h2\',[_vm._v("Perbarui eslintrc.js")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("module.exports = {\\n  plugins: [\'@typescript-eslint\'],\\n  parserOptions: {\\n    parser: \'@typescript-eslint/parser\'\\n  },\\n  extends: [\\n    \'@nuxtjs\',\\n    \'plugin:nuxt/recommended\',\\n  ],\\n  rules: {\\n    \'no-console\': process.env.NODE_ENV === \'production\' ? \'error\' : \'off\',\\n    \'no-debugger\': process.env.NODE_ENV === \'production\' ? \'error\' : \'off\',\\n    \'no-unused-vars\': \'off\',\\n    \'vue/component-name-in-template-casing\': [\\n      \'error\',\\n      \'PascalCase\',\\n      {\\n        ignores: [\'nuxt\', \'nuxt-link\', \'nuxt-child\', \'no-ssr\']\\n      }\\n    ],\\n    \'vue/html-closing-bracket-newline\': [\\n      \'error\',\\n      {\\n        singleline: \'never\',\\n        multiline: \'never\'\\n      }\\n    ]\\n  }\\n}\\n")])]),_vm._v(" "),_c(\'p\',[_vm._v("Dan menambahkan beberapa dependencies berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("{\\n  \\"@nuxtjs/eslint-config\\": \\"0.0.1\\",\\n  \\"@typescript-eslint/eslint-plugin\\": \\"1.9.0\\"\\n}\\n")])]),_vm._v(" "),_c(\'h2\',[_vm._v("Ubah nuxt.config.js menjadi nuxt.config.ts")]),_vm._v(" "),_c(\'p\',[_vm._v("Ubah ekstensi file dan buat sedikit perubahan menjadi seperti berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("import NuxtConfiguration from \'@nuxt/config\'\\nimport {\\n  Configuration as WebpackConfiguration\\n} from \'webpack\'\\n\\nconst config: NuxtConfiguration = {\\n  mode: \'universal\',\\n  head: {},\\n  build: {\\n    extend(config: WebpackConfiguration, ctx) {\\n    }\\n  }\\n}\\n\\nexport default config\\n")])]),_vm._v(" "),_c(\'h2\',[_vm._v("Refactor Vuex Store")]),_vm._v(" "),_c(\'p\',[_vm._v("Karena hampir semua komponen dalam projek saya telah menggunakan Vuex Store maka dari itu saya meletakan hal ini sebagai yang pertama untuk saya refactor sebelum melakukan refactor pada komponen. Untuk menggunakan Vuex dengan TypeScript terdapat sedikit perubahan dibandingkan ketika menggunakan JavaScript biasa, berikut perubahan yang saya kerjakan:")]),_vm._v(" "),_c(\'h3\',[_vm._v("Classic Store")]),_vm._v(" "),_c(\'p\',[_vm._v("Pada projek ini saya masih menggunakan Classic Store yang mana sebenarnya sudah deprecated dan akan di remove pada Nuxt v3 kedepannya, berikut classic store yang saya buat dalam berkas "),_c(\'code\',{pre:true},[_vm._v("store/index.ts")]),_vm._v(":")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("import Vuex from \'vuex\'\\n\\nimport { state } from \'./state\'\\nimport { mutations } from \'./mutations\'\\nimport { actions } from \'./actions\'\\n\\nconst createStore = () => {\\n  return new Vuex.Store({\\n    state: state(),\\n    mutations,\\n    actions\\n  })\\n}\\n\\nexport default createStore\\n")])]),_vm._v(" "),_c(\'h3\',[_vm._v("State")]),_vm._v(" "),_c(\'p\',[_vm._v("Pada berkas "),_c(\'code\',{pre:true},[_vm._v("state.ts")]),_vm._v(" saya membuat interface yang menjadi type definitions dari state yang akan dibuat dan membuat state dengan berbagai initial state yang sudah dibuat seperti contoh berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("export interface StateType {\\n  isShowSidebar: boolean,\\n}\\n\\n// initial state\\nexport const state = (): StateType => ({\\n  isShowSidebar: false\\n})\\n")])]),_vm._v(" "),_c(\'h3\',[_vm._v("Mutations")]),_vm._v(" "),_c(\'p\',[_vm._v("Vuex sendiri sudah menyediakan dukungan untuk TypeScript dengan memberikan tipe data pada balikan untuk Mutations dengan cukup meng-import "),_c(\'code\',{pre:true},[_vm._v("MutationTree")]),_vm._v(" dari Vuex, berikut contoh kodenya:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("import { MutationTree } from \'vuex\'\\nimport { StateType } from \'./state\'\\nimport { Types } from \'./types\'\\n\\nexport const mutations: MutationTree<StateType> = {\\n  [Types.SET_SHOW_SIDEBAR](state: StateType, data: boolean) {\\n    state.isShowSidebar = data\\n  }\\n}\\n")])]),_vm._v(" "),_c(\'h3\',[_vm._v("Actions")]),_vm._v(" "),_c(\'p\',[_vm._v("Untuk actions sendiri hampir mirip dengan mutations yang mana sudah disediakan tipe data dari Vuex, seperti contoh kode berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("import { ActionTree } from \'vuex\'\\nimport { StateType } from \'./state\'\\nimport { Types } from \'./types\'\\n\\nexport const actions: ActionTree<StateType, StateType> = {\\n  setShowSidebar({ commit }, payload) {\\n    commit(Types.SET_SHOW_SIDEBAR, payload)\\n  }\\n}\\n")])]),_vm._v(" "),_c(\'h2\',[_vm._v("Refactor Komponen")]),_vm._v(" "),_c(\'p\',[_vm._v("Setelah berhasi melakukan refactor pada Vuex Store, selanjutnya kita akan melakukan refactor pada kode komponen kita agar mendukung TypeScript.")]),_vm._v(" "),_c(\'p\',[_vm._v("Untuk mendukung TypeScript, kita perlu menambahkan beberapa dependencies baru seperti berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("{\\n  \\"vue-class-component\\": \\"7.1.0\\",\\n  \\"vue-property-decorator\\": \\"8.1.1\\",\\n  \\"vuex-class\\": \\"0.3.2\\"\\n}\\n")])]),_vm._v(" "),_c(\'p\',[_vm._v("Yang paling utama, tentu kita harus mengubah kode dalam single file komponen Vue yang sebelumnya hanya "),_c(\'code\',{pre:true},[_vm._v("<script><\/script>")]),_vm._v(" menjadi "),_c(\'code\',{pre:true},[_vm._v("<script lang=\\"ts\\"><\/script>")]),_vm._v(" agar kita bisa mendukung kode TypeScript pada bagian script. Dan berikut contoh layout "),_c(\'code\',{pre:true},[_vm._v("default.vue")]),_vm._v(" yang sudah saya refactor menggunakan TypeScript:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("import { Component, Vue } from \'vue-property-decorator\'\\nimport { State, Mutation, Action } from \'vuex-class\'\\n\\nimport ArrowUpIcon from \'vue-ionicons/dist/js/ios-arrow-dropup-circle\'\\nimport BaseHeader from \'../components/BaseHeader.vue\'\\nimport BaseSidebar from \'../components/BaseSidebar.vue\'\\nimport BaseToast from \'../components/BaseToast.vue\'\\n\\n@Component({\\n  components: {\\n    BaseHeader,\\n    BaseSidebar,\\n    BaseToast,\\n    ArrowUpIcon\\n  }\\n})\\n\\nexport default class DefaultLayout extends Vue {\\n  showArrowToTop = false;\\n\\n  @State settingActiveTheme;\\n  @State isShowSidebar;\\n\\n  @Mutation setShowSidebar;\\n\\n  @Action initDataFromBrowserStorage;\\n  @Action setWebshareSupport;\\n\\n  hideSidebar(): void {\\n    this.setShowSidebar(false)\\n  }\\n\\n  handleScroll(): void {\\n    this.showArrowToTop = window.pageYOffset > 2000\\n  }\\n\\n  mounted() {\\n    window.addEventListener(\'scroll\', this.handleScroll)\\n  }\\n\\n  beforedestroy() {\\n    window.removeEventListener(\'scroll\', this.handleScroll)\\n  }\\n}\\n")])]),_vm._v(" "),_c(\'p\',[_vm._v("Seperti bisa kalian lihat dari contoh kode diatas, saya menggunakan "),_c(\'a\',{attrs:{"href":"https://github.com/kaorun343/vue-property-decorator"}},[_vm._v("vue-property-decorator ↗️")]),_vm._v(" untuk mendefinisikan komponen tersebut serta menggunakan "),_c(\'a\',{attrs:{"href":"https://github.com/ktsn/vuex-class"}},[_vm._v("vuex-class ↗️")]),_vm._v(" untuk melakukan binding terhadap Vuex Store yang telah dibuat sebelumnya agar bisa digunakan di dalam komponen. Silakan kunjungi tautan masing-masing untuk mempelajari lebih lanjut mengenai apa saja yang bisa dan tidak bisa kita lakukan dengan "),_c(\'code\',{pre:true},[_vm._v("vue-property-decorator")]),_vm._v(" maupun "),_c(\'code\',{pre:true},[_vm._v("vuex-class")]),_vm._v(".")]),_vm._v(" "),_c(\'h2\',[_vm._v("Refactor Jest Config")]),_vm._v(" "),_c(\'p\',[_vm._v("Unit test hampir tidak diperlukan perubahan sama sekali selain dari path dan nama file yang kemungkinan besar kita ubah nama dan letaknya. Kita hanya perlu mencocokan konfigurasi Jest agar mendukung TypeScript seperti pada contoh kode berikut:")]),_vm._v(" "),_c(\'pre\',[_c(\'code\',{pre:true,attrs:{"class":"language-javascript"}},[_vm._v("module.exports = {\\n  moduleNameMapper: {\\n    \'^~/(.*)$\': \'<rootDir>/$1\',\\n    \'^@/(.*)$\': \'<rootDir>/$1\',\\n    \'^vue$\': \'vue/dist/vue.common.js\'\\n  },\\n  moduleFileExtensions: [\'js\', \'ts\', \'vue\', \'json\'],\\n  transform: {\\n    \'^.+.tsx?$\': \'<rootDir>/node_modules/ts-jest\',\\n    \'^.+.js$\': \'<rootDir>/node_modules/babel-jest\',\\n    \'^.+.vue$\': \'<rootDir>/node_modules/vue-jest\'\\n  },\\n  globals: {\\n    \'ts-jest\': {\\n      diagnostics: false\\n    }\\n  }\\n}\\n")])]),_vm._v(" "),_c(\'h2\',[_vm._v("Repository sumber")]),_vm._v(" "),_c(\'p\',[_c(\'a\',{attrs:{"href":"https://github.com/mazipan/quran-offline"}},[_vm._v("🐙 https://github.com/mazipan/quran-offline ↗️")])]),_vm._v(" "),_c(\'h3\',[_vm._v("Demikian artikel kali ini, semoga bermanfaat...")])]) }]',component:{data:function(){return{templateRender:null}},render:function(n){return this.templateRender?this.templateRender():n("div","Rendering")},created:function(){this.templateRender=function(){var n=this.$createElement;this._self._c;return this._m(0)},this.$options.staticRenderFns=[function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"content-markdown"},[t("p",[n._v("Seperti kita tau bersama bahwa bawaan dari project Nuxt akan membuat kode dengan basis JavaScript Vanilla. Sedangkan dengan makin maraknya penggunaan TypeScript di kalangan para pengembang JavaScript membuat saya pribadi ikut kepincut untuk mengimplementasikan penggunaan TypeScript pada projek kode sumber terbuka saya.")]),n._v(" "),t("p",[n._v("Berikut hal-hal yang saya kerjakan dalam proses migrasi tersebut:")]),n._v(" "),t("h2",[n._v("Menambahkan tsconfig.json")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v('{\n  "compilerOptions": {\n    "target": "es5",\n    "module": "esnext",\n    "moduleResolution": "node",\n    "lib": ["esnext", "esnext.asynciterable", "dom"],\n    "esModuleInterop": true,\n    "experimentalDecorators": true,\n    "resolveJsonModule": true,\n    "allowJs": true,\n    "sourceMap": true,\n    "strict": true,\n    "noImplicitAny": false,\n    "strictNullChecks": false,\n    "noEmit": true,\n    "baseUrl": ".",\n    "paths": {\n      "~/*": ["./*"],\n      "@/*": ["./*"]\n    },\n    "types": ["@types/jest", "@types/node", "@nuxt/vue-app"]\n  },\n  "exclude": [\n    "nuxt.config.ts",\n    "node_modules/**",\n    "dist/**",\n    ".nuxt/**",\n    "tests/**"\n  ]\n}\n')])]),n._v(" "),t("p",[n._v("Untuk menambahkan berkas ini, saya juga perlu menambahkan beberapa dependencies berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v('{\n  "@nuxt/typescript": "2.7.1",\n  "@types/jest": "24.0.13",\n  "@types/node": "11.13.10",\n  "typescript": "3.4.5"\n}\n')])]),n._v(" "),t("h2",[n._v("Perbarui eslintrc.js")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("module.exports = {\n  plugins: ['@typescript-eslint'],\n  parserOptions: {\n    parser: '@typescript-eslint/parser'\n  },\n  extends: [\n    '@nuxtjs',\n    'plugin:nuxt/recommended',\n  ],\n  rules: {\n    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',\n    'no-unused-vars': 'off',\n    'vue/component-name-in-template-casing': [\n      'error',\n      'PascalCase',\n      {\n        ignores: ['nuxt', 'nuxt-link', 'nuxt-child', 'no-ssr']\n      }\n    ],\n    'vue/html-closing-bracket-newline': [\n      'error',\n      {\n        singleline: 'never',\n        multiline: 'never'\n      }\n    ]\n  }\n}\n")])]),n._v(" "),t("p",[n._v("Dan menambahkan beberapa dependencies berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v('{\n  "@nuxtjs/eslint-config": "0.0.1",\n  "@typescript-eslint/eslint-plugin": "1.9.0"\n}\n')])]),n._v(" "),t("h2",[n._v("Ubah nuxt.config.js menjadi nuxt.config.ts")]),n._v(" "),t("p",[n._v("Ubah ekstensi file dan buat sedikit perubahan menjadi seperti berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("import NuxtConfiguration from '@nuxt/config'\nimport {\n  Configuration as WebpackConfiguration\n} from 'webpack'\n\nconst config: NuxtConfiguration = {\n  mode: 'universal',\n  head: {},\n  build: {\n    extend(config: WebpackConfiguration, ctx) {\n    }\n  }\n}\n\nexport default config\n")])]),n._v(" "),t("h2",[n._v("Refactor Vuex Store")]),n._v(" "),t("p",[n._v("Karena hampir semua komponen dalam projek saya telah menggunakan Vuex Store maka dari itu saya meletakan hal ini sebagai yang pertama untuk saya refactor sebelum melakukan refactor pada komponen. Untuk menggunakan Vuex dengan TypeScript terdapat sedikit perubahan dibandingkan ketika menggunakan JavaScript biasa, berikut perubahan yang saya kerjakan:")]),n._v(" "),t("h3",[n._v("Classic Store")]),n._v(" "),t("p",[n._v("Pada projek ini saya masih menggunakan Classic Store yang mana sebenarnya sudah deprecated dan akan di remove pada Nuxt v3 kedepannya, berikut classic store yang saya buat dalam berkas "),t("code",{pre:!0},[n._v("store/index.ts")]),n._v(":")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("import Vuex from 'vuex'\n\nimport { state } from './state'\nimport { mutations } from './mutations'\nimport { actions } from './actions'\n\nconst createStore = () => {\n  return new Vuex.Store({\n    state: state(),\n    mutations,\n    actions\n  })\n}\n\nexport default createStore\n")])]),n._v(" "),t("h3",[n._v("State")]),n._v(" "),t("p",[n._v("Pada berkas "),t("code",{pre:!0},[n._v("state.ts")]),n._v(" saya membuat interface yang menjadi type definitions dari state yang akan dibuat dan membuat state dengan berbagai initial state yang sudah dibuat seperti contoh berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("export interface StateType {\n  isShowSidebar: boolean,\n}\n\n// initial state\nexport const state = (): StateType => ({\n  isShowSidebar: false\n})\n")])]),n._v(" "),t("h3",[n._v("Mutations")]),n._v(" "),t("p",[n._v("Vuex sendiri sudah menyediakan dukungan untuk TypeScript dengan memberikan tipe data pada balikan untuk Mutations dengan cukup meng-import "),t("code",{pre:!0},[n._v("MutationTree")]),n._v(" dari Vuex, berikut contoh kodenya:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("import { MutationTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const mutations: MutationTree<StateType> = {\n  [Types.SET_SHOW_SIDEBAR](state: StateType, data: boolean) {\n    state.isShowSidebar = data\n  }\n}\n")])]),n._v(" "),t("h3",[n._v("Actions")]),n._v(" "),t("p",[n._v("Untuk actions sendiri hampir mirip dengan mutations yang mana sudah disediakan tipe data dari Vuex, seperti contoh kode berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("import { ActionTree } from 'vuex'\nimport { StateType } from './state'\nimport { Types } from './types'\n\nexport const actions: ActionTree<StateType, StateType> = {\n  setShowSidebar({ commit }, payload) {\n    commit(Types.SET_SHOW_SIDEBAR, payload)\n  }\n}\n")])]),n._v(" "),t("h2",[n._v("Refactor Komponen")]),n._v(" "),t("p",[n._v("Setelah berhasi melakukan refactor pada Vuex Store, selanjutnya kita akan melakukan refactor pada kode komponen kita agar mendukung TypeScript.")]),n._v(" "),t("p",[n._v("Untuk mendukung TypeScript, kita perlu menambahkan beberapa dependencies baru seperti berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v('{\n  "vue-class-component": "7.1.0",\n  "vue-property-decorator": "8.1.1",\n  "vuex-class": "0.3.2"\n}\n')])]),n._v(" "),t("p",[n._v("Yang paling utama, tentu kita harus mengubah kode dalam single file komponen Vue yang sebelumnya hanya "),t("code",{pre:!0},[n._v("<script><\/script>")]),n._v(" menjadi "),t("code",{pre:!0},[n._v('<script lang="ts"><\/script>')]),n._v(" agar kita bisa mendukung kode TypeScript pada bagian script. Dan berikut contoh layout "),t("code",{pre:!0},[n._v("default.vue")]),n._v(" yang sudah saya refactor menggunakan TypeScript:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("import { Component, Vue } from 'vue-property-decorator'\nimport { State, Mutation, Action } from 'vuex-class'\n\nimport ArrowUpIcon from 'vue-ionicons/dist/js/ios-arrow-dropup-circle'\nimport BaseHeader from '../components/BaseHeader.vue'\nimport BaseSidebar from '../components/BaseSidebar.vue'\nimport BaseToast from '../components/BaseToast.vue'\n\n@Component({\n  components: {\n    BaseHeader,\n    BaseSidebar,\n    BaseToast,\n    ArrowUpIcon\n  }\n})\n\nexport default class DefaultLayout extends Vue {\n  showArrowToTop = false;\n\n  @State settingActiveTheme;\n  @State isShowSidebar;\n\n  @Mutation setShowSidebar;\n\n  @Action initDataFromBrowserStorage;\n  @Action setWebshareSupport;\n\n  hideSidebar(): void {\n    this.setShowSidebar(false)\n  }\n\n  handleScroll(): void {\n    this.showArrowToTop = window.pageYOffset > 2000\n  }\n\n  mounted() {\n    window.addEventListener('scroll', this.handleScroll)\n  }\n\n  beforedestroy() {\n    window.removeEventListener('scroll', this.handleScroll)\n  }\n}\n")])]),n._v(" "),t("p",[n._v("Seperti bisa kalian lihat dari contoh kode diatas, saya menggunakan "),t("a",{attrs:{href:"https://github.com/kaorun343/vue-property-decorator"}},[n._v("vue-property-decorator ↗️")]),n._v(" untuk mendefinisikan komponen tersebut serta menggunakan "),t("a",{attrs:{href:"https://github.com/ktsn/vuex-class"}},[n._v("vuex-class ↗️")]),n._v(" untuk melakukan binding terhadap Vuex Store yang telah dibuat sebelumnya agar bisa digunakan di dalam komponen. Silakan kunjungi tautan masing-masing untuk mempelajari lebih lanjut mengenai apa saja yang bisa dan tidak bisa kita lakukan dengan "),t("code",{pre:!0},[n._v("vue-property-decorator")]),n._v(" maupun "),t("code",{pre:!0},[n._v("vuex-class")]),n._v(".")]),n._v(" "),t("h2",[n._v("Refactor Jest Config")]),n._v(" "),t("p",[n._v("Unit test hampir tidak diperlukan perubahan sama sekali selain dari path dan nama file yang kemungkinan besar kita ubah nama dan letaknya. Kita hanya perlu mencocokan konfigurasi Jest agar mendukung TypeScript seperti pada contoh kode berikut:")]),n._v(" "),t("pre",[t("code",{pre:!0,attrs:{class:"language-javascript"}},[n._v("module.exports = {\n  moduleNameMapper: {\n    '^~/(.*)$': '<rootDir>/$1',\n    '^@/(.*)$': '<rootDir>/$1',\n    '^vue$': 'vue/dist/vue.common.js'\n  },\n  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],\n  transform: {\n    '^.+.tsx?$': '<rootDir>/node_modules/ts-jest',\n    '^.+.js$': '<rootDir>/node_modules/babel-jest',\n    '^.+.vue$': '<rootDir>/node_modules/vue-jest'\n  },\n  globals: {\n    'ts-jest': {\n      diagnostics: false\n    }\n  }\n}\n")])]),n._v(" "),t("h2",[n._v("Repository sumber")]),n._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/mazipan/quran-offline"}},[n._v("🐙 https://github.com/mazipan/quran-offline ↗️")])]),n._v(" "),t("h3",[n._v("Demikian artikel kali ini, semoga bermanfaat...")])])}]}}}}}}]);