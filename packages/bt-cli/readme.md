# 私有 npm

[A lightweight Node.js private proxy registry | Verdaccio](https://verdaccio.org/zh-CN/)

```shell
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

```shell
npm publish --registry http://localhost:4873/

npm unpublish name -f --registry http://localhost:4873/
```

