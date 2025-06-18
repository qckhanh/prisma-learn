import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql/type';
import { OrderType } from './order.type';
import { Database } from '../../database/database';

export const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        },
        address: {
            type: GraphQLString,
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve: (parent: any) => {
                return Database.orders.filter(order => {
                    return order.customer_id === parent.id;
                });
            },
        },
    }),
});
