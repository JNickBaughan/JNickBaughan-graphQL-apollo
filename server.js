//Mongo DB setup
const mongoose = require("mongoose");
//todo: research dotenv - this must be allowing me to get variables from variables.env
require("dotenv").config({ path: "variables.env" });
//authentication test
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.error("error connecting: " + err);
  });
const Recipe = require("./models/Recipe");
const User = require("./models/User");

//graphQL setup
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//application server setup
const express = require("express");

const server = express();

//add graphQL endpoints to application server
const bodyParser = require("body-parser");
server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

//init application server
const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
  console.log("apollo-graphQL");
});
