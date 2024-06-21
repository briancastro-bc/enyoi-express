import { SignJWT, generateSecret, } from 'jose';

const encode = async (payload) => {
  try {
    const {
      exp,
      iat,
      sub,
      // args = { name: 'Brian' }
      ...args 
    } = payload;

    // const secretKey = process.env.APP_SECRET;
    const secretKey = await generateSecret('HS256');
  
    const token = await new SignJWT()
      .setProtectedHeader({
        alg: 'HS256',
      })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setSubject(sub)
      .sign(
        secretKey,
        args,
      );
    
    return {
      success: true,
      token,
    };
  } catch (err) {
    return { success: false, }
  }
};

const decode = () => {};

const verify = () => {};

export {
  encode,
  decode,
  verify,
};