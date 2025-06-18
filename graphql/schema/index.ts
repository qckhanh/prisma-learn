import { RootQuery } from '../resolver/rootQuery';
import { GraphQLSchema } from 'graphql/type';

export const schema = new GraphQLSchema({
    query: RootQuery,
});
