const axios = require('axios');
const { GraphQLFloat, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const calculatePriceType = new GraphQLObjectType({
  name: 'CalculatePrice',
  fields: () => ({
    time: { type: TimeType },
    bpi: { type: BpiType }
  })
});

const TimeType = new GraphQLObjectType({
  name: 'Time',
  fields: () => ({
    updated: { type: GraphQLString }
  })
});

const BpiType = new GraphQLObjectType({
  name: 'Bpi',
  fields: () => ({
    USD: { type: USDType }
  })
});

const USDType = new GraphQLObjectType({
  name: 'USD',
  fields: () => ({
    code: { type: GraphQLString },
    rate_float: { type: GraphQLFloat }
  })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    calculatePrice: {
      type: calculatePriceType,
      resolve(parent, args) {
        return axios
        .get(`https://api.coindesk.com/v1/bpi/currentprice/USD.json`)
        .then(response => response.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({ 
  query: RootQuery
});