import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "default_secret";

export const createToken = (userId: string): string => {
    return jwt.sign({ userId }, secret, { expiresIn: "1h" });
}

export const verifyToken = (token: string): string | object => {
    return jwt.verify(token, secret);
}