const { ApolloServer, gql } = require('apollo-server')

const authors = [
  {
    name: 'Robert Martin',
    born: 1952
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  {
    name: 'Joshua Kerievsky',
    born: 1821
  },
]

const books = [
  {
    name: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    name: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns']
  },
  {
    name: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    name: 'Refactoring to patternis',
    published: 1968,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    name: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    name: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Query {
  }
`

const resolvers = {
  Query: {
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
