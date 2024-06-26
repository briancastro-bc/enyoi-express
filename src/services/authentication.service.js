import { createSecretKey, } from 'crypto';
import { 
  jwtVerify, 
  decodeJwt,
  SignJWT, 
} from 'jose';

const SECRET_KEY = createSecretKey(process.env.APP_SECRET, 'utf-8');

/**
 * 
 * Creacion del token.
 * 
 */
const encode = async (payload) => {
  try {
    const {
      exp, // expiración del token
      iat, // Cuando se creo el token
      sub, // Para quien se genero: id, email o username
      // args = { name: 'Brian' }
      ...args 
    } = payload;

    const token = await new SignJWT()
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setSubject(sub)
      .sign(SECRET_KEY);
    
    return {
      success: true,
      token,
    };
  } catch (err) {
    return { success: false, }
  }
};

const decode = (encoded) => {
  try {
    const payload = decodeJwt(encoded);
    return payload;
  } catch (err) {
    return { success: false, };
  }
};

const verify = async (encoded) => {
  try {
    const payload = await jwtVerify(encoded, SECRET_KEY);
    return payload;
  } catch (err) {
    return { success: false, };
  }
};

export {
  encode,
  decode,
  verify,
};