# System Architecture Diagram  guide:

![SVG Image](server.svg)


# Code Style:

## JavaScript guide:

>  ### 變數命名方式

#### 使用駝峰式命名法 (Camel Case)
```const userName = 'xxx';
const fileName = 'ooo';
const userList = ['111', '222', '333'];
const userMap = {
  111: {},
  222: {},
  333: {},
};
```
flag 命名方式使用 is 前綴

```const isOpen = true;
const isLogin = false;
```

> ### config 命名方式

全部以小寫方式命名

```
defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
	 vue(),
	 vuetify({ autoImport: true }),
	],
  base:"./",
  test:{
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  }
})
```

> ###  function 命名

#### 以動詞 + 名詞的命名方式

```
function validateForm() {
  // do something
}

function fetchUser() {
  // do something
}

function convertSecondsToHMS() {
  // do something
}
```

事件命名使用 on 前綴

```
function onAccountFormChange(event: Event) {
  // do something
}
```

> ### function 參數命名

參數最多3個， 如果超過可以使用物件的方式傳入

```
function validateForm(name: string, rules: Array<string>) {
  // do something
}
interface FetchUserData {
  id: number;
  account: string;
  phone: string;
}

function fetchUser(fetchData: FetchUserData, url: string) {
  // do something
}
```

> ### 其他注意事項

* 變數命名由多個形容詞、名詞組成，避免使用單一動詞當作變數，如 create = 1
* 變數和參數長度最多不要超過50字元
* 單頁最多150～200行之間, 超過要拆出部分邏輯
* import 套件統一擺在最上面 (套件 > 專案檔案 > type)
* 函式統一使用一般函式

### CSS guide :
>  #### 正常寫法

class 不超過6個或其他地方無共用
```
<nav class="w-2 h-2 rounded"></nav>
```
> #### 拆成共用 class 寫法

```
<nav class="nav"></nav>
```

```
.nav {
  @apply w-2 h-2 text-white bg-black rounded border-2 border-white cursor-pointer; 
}

or 

.nav {
  @apply
  w-2
  h-2
  text-white
  bg-black
  rounded
  border-2
  border-white
  cursor-pointer; 
}
```

> #### 拆成共用 component 寫法

```
<nav class="w-2 h-2 text-white bg-black rounded border-2 border-white cursor-pointer"></nav>
<custom-nav />
```

### SFC guide :

> #### script

```import 套件統一擺在最上面 (套件 > 專案檔案 > type)

import { ref, reactive, computed, provide, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCodeContentStore, useFlagStore } from '@/store';
import CodePreview from '@/components/CodePreview.vue';
import {
  HTML_LANGUAGE_MAP,
  CSS_LANGUAGE_MAP,
  JS_LANGUAGE_MAP,
} from '@/config/language';
import type { CodeModel } from '@/types/codeContent';
```
props 和 emit

```
interface Props {
  direction: 'x' | 'y';
  dragA?: string;
  dragB?: string;
  dragC?: string;
  unit?: '%' | 'vh' | 'vw';
  typeC?: 'next' | 'previous';
  limit?: Record<'min' | 'max', number>;
}

const props = withDefaults(defineProps<Props>(), {
  unit: '%',
  limit: () => ({ min: 0, max: 100 }),
});
const emit = defineEmits(['update:dragA', 'update:dragB', 'update:dragC']);
```

各個類型集中寫在同一區塊

```
const isShowPreview = ref(true);
const iframe = ref(null);
const codeWrapHeight = ref('40vh');
const previewHeight = ref('60vh');
const previewWidth = ref('66.7vw');

const { isSFC, codeId } = storeToRefs(useCodeContentStore());
const router = useRouter();
const route = useRoute();

const wrapHeight = computed(() => {
  return isShowPreview.value ? 'h-[40vh]' : 'h-[calc(100vh-88px)]';
});

provide('iframe', iframe);
provide('codeMenu', { isShowMenuMap, toggleMenu });

function toggleMenu(model: CodeModel, isOpen?: boolean) {
  isShowMenuMap[model] = isOpen ?? !isShowMenuMap[model];
}

function closeInitLoading() {
  const { setInitLoading } = useFlagStore();
  setInitLoading(false);
}

watch(codeId, (id) => router.push({ params: { id } }));
onMounted(closeInitLoading);
```
> #### <font color="red">其他注意事項</font>

* SFC 順序, script -> template -> css
* 單頁最多150～200行, 超過要拆出部分邏輯或元件
* SFC 內的 style 一律加上 scoped
### Pinia guide :
> ##### Pinia 使用邏輯

如需透過 api 結果修改 state，可把共用邏輯放到 actions 中做處理


```
export default defineStore('coding-standards-user', {
  state: () => defaultState,
  getters: {
    isLogin: (state) => {
      return Object.hasOwn(state.user, 'account');
    },
  },
  actions: {
    async login(data: LoginPayload) {
      const { resultMap } = await loginUser(data);
      const { token, user } = resultMap;

      this.user = user;
      localStorage.setItem('coding_standards_token', token);
      localStorage.setItem('coding_standards_account',data.account)
    },
    async logout() {
      await logoutUser();

      this.user = {};
      localStorage.removeItem('coding_standards_token');
    }
  },
});
import { useUserStore } from '@/stores';

const resultMap = await useUserStore().login(user);
```

## Commit guide :
> #### commit type

可以搭配 commitlint 和 husky 進行commit-msg 驗證


* feat: 新增/修改功能
```
feat: message letter notification feature
```
*fix: 修補 bug
```
fix: #12543 can't see the picture in the letter
```
* docs: 修改文檔
```
docs: create README.md
```
* style: 程式碼的格式 (空格、 縮排、分號、 逗號等等)
```
style: adjust HTML indentation
```
* refactor: 重構及改善效能 (既不是新增功能，也不是修補 bug 的程式碼變動)
```
refactor: daily notification letters, refactoring program structure
```
* test: 增加測試
```
test: add index page e2e test
```
* chore: 建構程序、套件的變動或版本更新
```
chore: upgrade vite 4.16 => 4.17
```
## 資料夾結構 :
```
src/
├── assets/*
|   ├──fonts/*
│   └── img/
│       └── Add_On.png
│       └── logo.ico
├── axios/
│   ├── index.js  
│    
├── components/
│   ├── public/
│   │   └── Nbt.vue
│   │   └── Nswitch.vue
│   │
│   └── Wifi.vue
│   └── TouchStartmode.vue
├── configs/*
├── hooks/*
├── locales/
│   ├── en.json
│   └── zh.json
├── plugins/
│   │── vuetify.js
│   └── webfontloader.js
├── router/
│   └── index.js
|   └── routes.js
├── stores/
│   └── card.js
│   └── chargePile.js
├── tests/
│   ├── unit/
│   └── Wifi.test.js
├── views/
│   ├── BluetoothView.vue
│   └── CardView.vue
├── style.css
├── main.js
├── App.vue
├── index.html
└── package-lock.json
└── package.json
└── vite.config.mts
```

### 資料夾file名稱 :
> #### pages
```
pages/名稱.vue (.vue 檔開頭一律大寫)

example:
  pages/IndexPage.vue
```
> #### components
```
components/分類(page)/page + 名稱.vue

example:
  components/common/HelloWorld.vue
  components/indexPage/IndexPagePopup.vue
```
> #### apis
```
apis/名稱(page).ts

example:
  apis/indexPage.ts
  apis/common.ts
```
> #### mocks
```
handlers/apis/對應api名稱.ts

example:
  handlers/apis/indexPage.ts
  handlers/apis/common.ts
```

> #### hooks

```
hooks/use名稱.ts

example:
  hooks/usePage.ts
```


> #### stores

```
stores/modules/名稱.ts

example:
  stores/modules/config.ts
```

> #### styles

```
styles/分類/名稱.postcss

example:
  styles/common/button.postcss
  styles/chat/chatHeader.postcss
  styles/chat/chatFooter.postcss
```



> #### unit test

```
unit/分類/名稱.test.ts

example:
components/common/HelloWorld.vue -> unit/components/common/HelloWorld.test.ts
```
