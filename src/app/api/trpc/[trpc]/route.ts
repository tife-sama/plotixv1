import {fetchRequestHandler} from "@trpc/server/adapters/fetch"
import { AppRouter
 } from "@/trpc"
const handler = (req: Request) => {
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: AppRouter,
        // @ts-expect-error context already passed from express middleware
        createContext: () => ({}),
    })
}

export {handler as GET, handler as POST}