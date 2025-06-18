import { Database } from '../database/database';
import { HttpError } from '../helpers/httpsError.helpers';

export class CustomerService {
  static async getAllUsers(): Promise<any> {
    console.log(Database.customers);
    return Database.customers;
  }

  private static SELL_OFF(
    status: boolean,
    percent: number = 0,
  ): number {
    if (!status || percent < 0) return 0;
    return 1 - percent / 100;
  }

  static async getCustomerById(id: number): Promise<any> {
    const result = Database.customers.find(
      customer => customer.id === id,
    );

    if (!result) {
      throw new HttpError(`Not found`, 404, 'USER_NOT_FOUND');
    }

    const order = Database.orders.filter(
      order => order.customer_id === id,
    );
    return {
      customer: result,
      order: order,
    };
  }

  static async getTotal(id: number): Promise<any> {
    const order = Database.orders.filter(
      order => order.customer_id === id,
    );

    const products = Database.products.filter(product =>
      order.some(o => o.product_id === product.id),
    );

    let total = 0;
    for (const product of products) {
      const sell_off = this.SELL_OFF(
        product.sell_off,
        product.percent,
      );

      total += product.price * sell_off;
    }

    return {
      total_price: total,
    };
  }
}
