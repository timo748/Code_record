```javascript
class Errors {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    clear(field) {
        this.errors[field] = '';
    }

    set(errors) {
        this.errors = errors;
    }
}

export default Errors;
```

在 `Errors` 类中定义了三个方法：

- `get`：用于获取给定字段的错误消息（这里为了简化代码返回的是多个错误消息中的第一个）；
- `clear`：用于清除给定字段的错误消息；
- `set`：用于设置整体的错误消息包。

`app.js` 中全局引入这个类

window.Vue = require('vue');
window.Errors = require('./errors').default;



```vue
<template>
    <div class="card col-8 post-form">
        <h3 class="text-center">发布新文章</h3>
        <hr>
        <form @submit.prevent="store" @keyup="errors.clear($event.target.name)">
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" ref="title" class="form-control" id="title" name="title" v-model="article.title">
                <div class="alert alert-danger" role="alert" v-show="errors.get('title')">
                    {{ errors.get('title') }}
                </div>
            </div>
            <div class="form-group">
                <label for="author">作者</label>
                <input type="text" ref="author" class="form-control" id="author" name="author" v-model="article.author">
                <div class="alert alert-danger" role="alert" v-show="errors.get('author')">
                    {{ errors.get('author') }}
                </div>
            </div>
            <div class="form-group">
                <label for="content">内容</label>
                <textarea class="form-control" ref="content" id="content" name="content" rows="5" v-model="article.content"></textarea>
                <div class="alert alert-danger" role="alert" v-show="errors.get('content')">
                    {{ errors.get('content') }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">立即发布</button>
            <div class="alert alert-success" role="alert" v-show="published">
                文章发布成功。
            </div>
        </form>
    </div>
</template>

<script>
export default {

    data() {
        return {
            article: {
                title: "",
                author: "",
                content: "",
            },
            errors: new Errors(),
            published: false
        }
    },
    methods: {
        store() {
            axios.post("/post", this.article).then(response => {
                // 请求处理成功
                this.published = true;
                console.log(response.data);
            }).catch(error => {
                // 请求验证失败
                // 将错误包赋值给 errors 对象
                this.errors.set(error.response.data.errors);
            });
        }
    }
}
</script>
```

重构：

```javascript
class Form {
    constructor(data) {
        this.originData = data;

        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
        this.success = false;
    }

    /**
     * 返回表单数据
     *
     * @returns {{}}
     */
    data() {
        let data = {};

        for (let field in this.originData) {
            data[field] = this[field];
        }

        return data;
    }

    /**
     * 清空表单数据
     */
    reset() {
        for (let field in this.originData) {
            delete this[field];
        }

        this.errors.clear();
    }

    /**
     * 发送 POST 请求
     *
     * @param url
     * @returns {Promise<unknown>}
     */
    post(url) {
        return this.submit(url, 'post');
    }

    /**
     * 发送 PUT 请求
     *
     * @param url
     * @returns {Promise<unknown>}
     */
    put(url) {
        return this.submit(url, 'put');
    }

    /**
     * 表单提交处理
     *
     * @param {string} url
     * @param {string} method
     */
    submit(url, method) {
        return new Promise((resolve, reject) => {
            axios[method](url, this.data())
                .then(response => {
                    this.onSuccess(response.data);
                    this.success = true;
                    resolve(response.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);
                    reject(error.response.data);
                });
        });
    }


    /**
     * 处理表单提交成功
     *
     * @param {object} data
     */
    onSuccess(data) {
        console.log(data);
        this.reset();
    }


    /**
     * 处理表单提交失败
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.set(errors);
    }

}

class Errors {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    clear(field) {
        if (field) {
            delete this.errors[field];
            return;
        }
        this.errors = {};
    }

    set(errors) {
        this.errors = errors;
    }
}

export default Form;
```



```
app.js` 中的 `Errors` 引入调整为 `Form
window.Form = require('./form').default;
```

```vue
<template>
    <div class="card col-8 post-form">
        <h3 class="text-center">发布新文章</h3>
        <hr>
        <form @submit.prevent="store" @keyup="form.errors.clear($event.target.name)">
            <div class="form-group">
                <label for="title">标题</label>
                <input type="text" ref="title" class="form-control" id="title" name="title" v-model="form.title">
                <div class="alert alert-danger" role="alert" v-show="form.errors.get('title')">
                    {{ form.errors.get('title') }}
                </div>
            </div>
            <div class="form-group">
                <label for="author">作者</label>
                <input type="text" ref="author" class="form-control" id="author" name="author" v-model="form.author">
                <div class="alert alert-danger" role="alert" v-show="form.errors.get('author')">
                    {{ form.errors.get('author') }}
                </div>
            </div>
            <div class="form-group">
                <label for="content">内容</label>
                <textarea class="form-control" ref="content" id="content" name="content" rows="5" v-model="form.content"></textarea>
                <div class="alert alert-danger" role="alert" v-show="form.errors.get('content')">
                    {{ form.errors.get('content') }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">立即发布</button>
            <div class="alert alert-success" role="alert" v-show="form.success">
                文章发布成功。
            </div>
        </form>
    </div>
</template>

<script>
export default {

    data() {
        return {
            form: new Form({
                title: '',
                author: '',
                content: ''
            })
        }
    },
    methods: {
        store() {
            this.form.post('/post')
                .then(data => console.log(data))   // 自定义表单提交成功处理逻辑
                .catch(data => console.log(data)); // 自定义表单提交失败处理逻辑
        }
    }
}
</script>
```

