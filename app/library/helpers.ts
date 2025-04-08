import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constants";

export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, SALT_ROUNDS);
}

export function comparePassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}