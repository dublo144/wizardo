const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const grapqlSchema = require('./graphql/schema/index');
const rootResolver = require('./graphql/resolvers/index');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-access-token'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: grapqlSchema,
    rootValue: rootResolver,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0-wabpp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(3001))
  .catch((e) => console.log(e));
