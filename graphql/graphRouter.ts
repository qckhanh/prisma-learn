import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';

const graphQLRouter = Router();

graphQLRouter.use(
    '/api/v1/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

export default graphQLRouter;
