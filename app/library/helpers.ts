import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const hash = async (data: string) => {
    return await argon2.hash(data);
}

export const createToken = (userId: string) => {
    return jwt.sign(userId, process.env.PAYLOAD!);
}

export const getUserId = (sessionToken: string) => {
    return jwt.verify(sessionToken, process.env.PAYLOAD!).toString();
}