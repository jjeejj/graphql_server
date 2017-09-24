const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql',expressGraphQL({
    schema,
    graphiql: true,
    pretty: true
}));

app.listen(4000,function(){
    console.log('server is running 4000.......' )
})