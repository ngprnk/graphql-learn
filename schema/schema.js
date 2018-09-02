import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
} from 'graphql';

const _ = require('lodash');

// dummy data
const books = [
  {
    name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1',
  },
  {
    name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2',
  },
  {
    name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2',
  },
  {
    name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3',
  },
  {
    name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3',
  },
  {
    name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3',
  },
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
];

// defines the structure of the data
const BookType = new GraphQLObjectType({
  name: 'Book',
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
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      reslove(parent, args) {
        const bookss = _.filter(books, { authorId: parent.id });
        console.log(bookss);
        return bookss;
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
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});


export default new GraphQLSchema({
  query: RootQuery,
});
