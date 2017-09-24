**学习 `graphql`的代码**

### 说明：

#### 使用模块说明

* graphql
* express
* express-graphql
* json-server
* axios

#### 文件说明

* db.json : `json-server`使用的初始数据方便`graphql`接口调用
* server.js : 启动服务的文件
* schema.js : 定义`graphql` 接口类型的文件

#### 启动说明

* 主服务启动： `npm start`
* 接口数据服务启动（`json-server`）: `npm run json:server`

#### 访问说明

在浏览器访问：`http://localhost:4000/graphql` 就可以进行调试了