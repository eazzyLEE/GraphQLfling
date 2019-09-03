const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema')

const app = express();
app.use(
  '/graphiql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
);

const PORT = process.env.PORT || 4333;

app.listen(PORT, () => console.log(`🚀 Server ready at port ${PORT}`));