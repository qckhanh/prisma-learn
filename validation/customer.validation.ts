import { z } from 'zod';

export const customerValidation = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(100, {
      message: 'Name length should be smaller than 100',
    }),
  email: z
    .string()
    .email({
      message: 'Invalid email format',
    })
    .max(100, {
      message: 'Email length should be smaller than 100',
    }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required',
    })
    .max(100, {
      message: 'Phone number should be smaller than 12',
    })
    .optional(),
});
