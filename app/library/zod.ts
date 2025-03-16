import { z } from "zod";

export const authBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    rememberMe: z.boolean()
});