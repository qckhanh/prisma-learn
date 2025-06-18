import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql/type';
import { Database } from '../../database/database';

export const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        name: {
            type: GraphQLString,
        },
        price: {
            type: GraphQLFloat,
        },
        sell_off: {
            type: GraphQLBoolean,
            resolve: (parent: any) => {
                return parent.sell_off || false;
            },
        },
        percent: {
            type: GraphQLFloat,
            resolve: (parent: any) => {
                return parent.percent || 0;
            },
        },
        quantity_sold: {
            type: GraphQLInt,
            resolve: (parent: any) => {
                let quantity = 0;
                const orders = Database.orders;
                for (const order of orders) {
                    if (order.product_id === parent.id) {
                        quantity += order.quantity;
                    }
                }

                return quantity;
            },
        },
    }),
});
