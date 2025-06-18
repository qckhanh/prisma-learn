import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../helpers/HttpResponse';
import { CustomerService } from '../service/customer.service';

export class CustomerController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await CustomerService.getAllUsers();
      HttpResponse.sendYES(res, 201, 'All users fetched', result);
    } catch (err) {
      next(err);
    }
  }

  static async getCustomerById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await CustomerService.getCustomerById(id);
      HttpResponse.sendYES(res, 200, 'User fetched', result);
    } catch (err) {
      next(err);
    }
  }

  static async getTotal(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await CustomerService.getTotal(id);
      HttpResponse.sendYES(res, 200, 'Total fetched', result);
    } catch (err) {
      next(err);
    }
  }
}
