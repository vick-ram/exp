import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const createToken = (userId: string): string => {
    return jwt.sign({ userId }, String(secret), { expiresIn: "1h" });
}

export const verifyToken = (token: string): string | object => {
    return jwt.verify(token, String(secret));
}