import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const authHandler = toNextJsHandler(auth);

export const GET = async (req: Request) => {
    return authHandler.GET(req);
};

export const POST = async (req: Request) => {
    return authHandler.POST(req);
};