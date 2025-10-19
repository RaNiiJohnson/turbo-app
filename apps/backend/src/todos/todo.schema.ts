import z from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const creatTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof creatTodoSchema>;
