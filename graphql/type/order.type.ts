import { GraphQLInt, GraphQLObjectType } from 'graphql/type';

export const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        product_id: {
            type: GraphQLInt,
        },
        quantity: {
            type: GraphQLInt,
        },
    }),
});
