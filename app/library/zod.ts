import { z } from "zod";

export const authBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    rememberMe: z.boolean()
});

export const profileBody = z.object({
    name: z.string(),
    rollNo: z.string(),
    email: z.string().email(),
    course: z.string(),
    semister: z.string(),
    passingYear: z.number()
});