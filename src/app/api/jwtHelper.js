import { SignJWT } from "jose";
import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    if (payload && payload != null) {
    }
    return payload;
  } catch (error) {
    return null;
  }
}

export const getToken = async (userId) => {
  return new SignJWT({ userId })
    .setIssuer("http://authentication.app.com")
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(new Date())
    .setExpirationTime("1h")
    .sign(getJwtSecretKey());
};

export const validateRequest = async (req) => {
  const authheader = req.headers?.get("authorization")?.substring(7);

  if (!authheader || authheader == null || authheader == undefined) {
    return false;
  }
  const isValid = await verifyJwtToken(authheader);
  if (isValid == null) {
    return false;
  }
  return true;
};
