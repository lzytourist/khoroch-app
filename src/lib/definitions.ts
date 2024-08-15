import {z} from "zod";

export const SignUpSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(200, 'Maximum 200 characters allowed'),
  email: z.string()
    .min(1, 'Email is required')
    .email(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Maximum 100 characters allowed'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password does not match',
  path: ['confirmPassword']
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const TransactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  note: z.string().min(0),
  amount: z.coerce.number().int().gte(1),
  type: z.enum(['BALANCE', 'EXPENSE', 'LOAN_TAKEN', 'LOAN_GIVEN']),
});