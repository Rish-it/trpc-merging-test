import { publicProcedure, router } from './trpc';
import { z } from 'zod'; // Corrected import
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const todoInputType = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required")
});

const appRouter = router({
    signUp: publicProcedure
        .input(z.object({
            email: z.string().email("Invalid email address"),
            password: z.string().min(6, "Password must be at least 6 characters long")
        }))
        .mutation(async ({ input }) => {
            const { email, password } = input;
            const token = "123321"; 
            return {
                token
            };
        })
});

const server = createHTTPServer({
    router: appRouter,
});
server.listen(3000);
export type AppRouter = typeof appRouter;
