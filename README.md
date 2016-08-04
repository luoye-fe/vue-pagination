vue-pagination
-------------------

[中文文档](./doc/CHINESE.md)

Pagination component for [Vue.js](vuejs.org).  

**Compatibility Note** : vue-pagination requires Vue.js 1.0.0+  


### Installation

* Script Tag

    ```html
    <script type="text/javascript" src="http://cdn.bootcss.com/vue/1.0.26/vue.js"></script>
    <script type="text/javascript" src="./dist/vue-pagination.min.js"></script>
    ```

* NPM

    I don't publish this repo on npm, you can install by github.  

    ```bash
    npm install https://github.com/luoye-fe/vue-pagination.git
    ```

### Usage

* template

    ```html
    <v-pagination :pagination-config.sync="config"></v-pagination>
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

### Demo

[Demo](http://luoye.pw/html/vue-pagination/)

### Options

* use options

    While useing Commonjs/ES6 Module, you should exec `Vue.use(VuePagination)`, at this point you can pass options by `Vue.use(VuePagination, optionsObj)`.

    | Name          | Type     | Default        | Required | Description
    | :------------ | :--------| :------------- | :--------| :-----------
    | tagName       | String   | vue-pagination |          | custom tag name

    **example**

    ```js
    import Vue from 'vue';
    import VuePagination from 'vue-pagination';
    Vue.use(VuePagination, {
        tagName: 'vue-pagintaion'
    })
    ```

* pagination config
    
    vue-pagination accept props named `pagination-config.sync`, you must pass some required options, all options as follows.

    | Name          | Type     | Default | Required | Description
    | :------------ | :--------| :-------| :--------| :-----------
    | firstStr      | String   | First   | false    | First button text
    | prevStr       | String   | Prev    | false    | Prev button text
    | nextStr       | String   | Next    | false    | Next button text
    | lastStr       | String   | Last    | false    | Last button text
    | first         | Boolean  | True    | false    | Need first button or not
    | prev          | Boolean  | True    | false    | Need prev button or not
    | next          | Boolean  | True    | false    | Need next button or not
    | last          | Boolean  | True    | false    | Need last button or not
    | normal        | Boolean  | True    | false    | Need normal page list or not
    | currentPage   | Number   | 1       | false    | CurrentPage
    | itemsPerPage  | Number   | 10      | false    | Item number every page
    | pagesLength   | Number   | 5       | false    | Normal page list length
    | totalItems    | Number   | 0       | true     | Total items number (calculate numbers of page by this)
    | onChange      | Function |         | false    | Callback function when currentPage change
