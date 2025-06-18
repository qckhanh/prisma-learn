import { Router } from 'express';
import { CustomerController } from '../controller/customer.controllers';

const customerRoute = Router();

customerRoute.get('/:id/total', CustomerController.getTotal);
customerRoute.get('/:id', CustomerController.getCustomerById);
customerRoute.get('/', CustomerController.getAll);

export default customerRoute;
