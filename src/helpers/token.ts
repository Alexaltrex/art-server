import jwt from 'jsonwebtoken';

export const generateAccessTokens = async () => {
    const accessToken = await jwt.sign(
        {},
        process.env.ACCESS_TOKEN_SECRET as string,
        //{expiresIn: '1d'} // если не задано живет бесконечно
    );
    return accessToken
}
