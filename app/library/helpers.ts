import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hash = async (data: string) => {
    return await bcrypt.hash(data, 10);
}

export const createToken = (userId: string) => {
    return jwt.sign(userId, process.env.PAYLOAD!);
}