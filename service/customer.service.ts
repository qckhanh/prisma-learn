import { Customer, PrismaClient } from '@prisma/client';
import { MyPrisma } from '../prisma';
import { HttpError } from '../helpers/httpsError.helpers';

export class CustomerService {
    private static prisma: PrismaClient = MyPrisma.getInstance();

    static async create(data: Customer): Promise<Customer> {
        try {
            const customer: Customer | null = await this.prisma.customer.findFirst({
                where: {
                    OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
                },
            });
            if (customer) {
                throw new HttpError('Email or phone already used', 401, 'EMAIL_EXISTS');
            }

            return await this.prisma.customer.create({
                data,
            });
        } catch (err) {
            throw err;
        }
    }

    static async getAll(page: number, limit: number): Promise<any> {
        try {
            const skip = (page - 1) * limit;
            const [customers, total] = await Promise.all([
                this.prisma.customer.findMany({
                    skip,
                    take: limit,
                }),
                this.prisma.customer.count(),
            ]);

            const totalPages: number = Math.ceil(total / limit);
            return {
                data: customers,
                total,
                totalPages,
            };
        } catch (err) {
            throw err;
        }
    }
}
