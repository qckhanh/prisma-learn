import { Router } from 'express';
import { CustomerController } from '../controller/customer.controllers';
import { validateRequest } from '../middleware/validate.middleware';
import { customerValidation } from '../validation/customer.validation';
import { dataSource } from '../enums/dataSource.enum';

const customerRoute = Router();
customerRoute.post(
    '/',
    validateRequest(customerValidation, dataSource.BODY),
    CustomerController.create,
);

customerRoute.get('/', CustomerController.getAll);

export default customerRoute;
