vue-pagination
-------------------

[Vue.js](vuejs.org) 分页组件。  

**注意** : vue-pagination 要求 Vue.js 版本在 1.0.0 以上  


### 安装

* Script 标签

    ```html
    <script type="text/javascript" src="http://cdn.bootcss.com/vue/1.0.26/vue.js"></script>
    <script type="text/javascript" src="./dist/vue-pagination.min.js"></script>
    ```

* NPM

    本项目没有发布在 NPM 上，你可以使用 Github 进行安装。  

    ```bash
    npm install https://github.com/luoye-fe/vue-pagination.git
    ```

### 使用

* template

    ```html
    <v-pagination :pagination-conf.sync="config"></v-pagination>
    ```

* js

    ```js
    export default {
        data() {
            return {
                config: {
                    currentPage: 1,
                    itemsPerPage: 10,
                    pagesLength: 5,
                    totalItems: 0,
                    onChange() {}
                }
            };
        },
        ready() {
            this.config.onChange = () => {
                console.log(this.config.currentPage);
            };
        }
    };
    ```

### 示例

[Demo](http://luoye.pw/html/vue-pagination/)

### 选项

* use options

    在使用 Cmmonjs 或者 ES6 Module时，需要调用 `Vue.use(VuePagination)`，此时你可以传递一些配置信息通过 `Vue.use(VuePagination, optionsObj)`。

    | 名称           | 类型      | 默认值          | 是否必须   | 描述
    | :------------ | :--------| :------------- | :--------| :-----------
    | tagName       | String   | vue-pagination |          | 自定义标签名

    **示例**

    ```js
    import Vue from 'vue';
    import VuePagination from 'vue-pagination';
    Vue.use(VuePagination, {
        tagName: 'vue-pagintaion'
    })
    ```

* pagination config

    vue-pagination 接受名为 `pagination-conf` 属性，需传递组件的必需参数使组件能够正常工作。所有参数如下：

    | 名称           | 类型      | 默认值   | 是否必须   | 描述
    | :------------ | :--------| :-------| :--------| :-----------
    | firstStr      | String   | First   | false    | 首页按钮文案
    | prevStr       | String   | Prev    | false    | 上一页按钮文案
    | nextStr       | String   | Next    | false    | 下一页按钮文案
    | lastStr       | String   | Last    | false    | 末页按钮文案
    | first         | Boolean  | True    | false    | 是否需要首页按钮
    | prev          | Boolean  | True    | false    | 是否需要上一页按钮
    | next          | Boolean  | True    | false    | 是否需要下一页按钮
    | last          | Boolean  | True    | false    | 是否需要末页按钮
    | normal        | Boolean  | True    | false    | 是否需要页数列表
    | currentPage   | Number   | 1       | false    | 当前页
    | itemsPerPage  | Number   | 10      | false    | 每页条目数
    | pagesLength   | Number   | 5       | false    | 页数列表长度
    | totalItems    | Number   | 0       | true     | 总条目数（组件根据这个参数，计算出共有多少页，为 0 时组件不现实）
    | onChange      | Function |         | false    | 当前页数变化时调用

