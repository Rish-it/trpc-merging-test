import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
    signUp: publicProcedure
        .input(
            z.object({
                email: z.string(),
                password: z.string()
            })
        )
        .mutation(async (opts) => {
            const username = opts.ctx.username;
            console.log(username);
            let email = opts.input.email;
            let password = opts.input.password;
            let token = "123321";
            return {
                token
            };
        }),
    createTodo: publicProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string()
            })
        )
        .mutation(async (opts) => {
            console.log(opts.ctx.username);
            return{
                id:"1"
            }
        })
});



const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];
        console.log(authHeader);
        return {
            username: "xyz"
        };
    }
});

server.listen(3000);
export type AppRouter = typeof appRouter;
