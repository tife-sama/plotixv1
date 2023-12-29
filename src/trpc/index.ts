import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";

export const AppRouter = router({
   auth: authRouter
    })


export type AppRouter = typeof AppRouter