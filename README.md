# prep client

> Prepclass client repository

## Build Setup

- Copy `config/dev.env.example.js` to `config/dev.env.js`

- Copy `config/dev.prod.example.js` to `config/dev.prod.js`

- Modify `BASE_API` in `dev.env.js` and `prod.env.js` to the api url for the development and production api endpoints respectively


``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
