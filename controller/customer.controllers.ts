import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../helpers/HttpResponse';
import { CustomerService } from '../service/customer.service';
import { Customer } from '@prisma/client';

export class CustomerController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const customer: Customer | undefined = await CustomerService.create(req.body);
            HttpResponse.sendYES(res, 201, 'Customer created successfully', customer);
        } catch (err) {
            console.log('hi');
            next(err);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;

            const {
                data: customers,
                total,
                totalPages,
            } = await CustomerService.getAll(page, limit);
            HttpResponse.sendYES(res, 200, 'Customers retrieved successfully', {
                customers,
                total,
                totalPages,
                currentPage: page,
            });
        } catch (err) {
            next(err);
        }
    }
}
