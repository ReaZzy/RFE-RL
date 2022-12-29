import { ZodError } from 'zod';

export const parseZodErrors = (error: ZodError) => {
  return error.errors.map((err) => err.message).join(', ');
};
