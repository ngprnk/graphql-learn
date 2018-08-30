import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const _ = require('lodash');

// dummy data
const books = [
  {
    name: 'adad', genre: 'asdd', id: 1, authorId: 1,

  },
  {
    name: 'adad', genre: 'asdd', id: 2, authorId: 1,
  },
];

const authors = [
  { name: 'Nischal Gautam', age: 34, id: 1 },
];


// defines the structure of the data
const BookType = new GraphQLObjectType({
  name: 'book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

// defines the structure of the data

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      reslove(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});


// defines the structure of the query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});


export default new GraphQLSchema({
  query: RootQuery,
});
