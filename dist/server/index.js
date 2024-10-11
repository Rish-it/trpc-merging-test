"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const zod_1 = require("zod"); // Corrected import
const standalone_1 = require("@trpc/server/adapters/standalone");
const todoInputType = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required")
});
const appRouter = (0, trpc_1.router)({
    createTodo: trpc_1.publicProcedure
        .input(todoInputType)
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        const { title, description } = input;
        // TODO: Replace with actual database interaction
        // Example using a hypothetical database client:
        // const newTodo = await db.todo.create({ data: { title, description } });
        return {
            id: "1", // Replace with newTodo.id
            title,
            description
        };
    })),
    signUp: trpc_1.publicProcedure
        .input(zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters long")
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        const { email, password } = input;
        // TODO: Implement password hashing and user creation
        // Example:
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = await db.user.create({ data: { email, password: hashedPassword } });
        // TODO: Implement secure token generation
        // Example using JWT:
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const token = "123321"; // Replace with actual token
        return {
            token
        };
    }))
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
});
server.listen(3000);
