import jsonWebToken from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcryptjs';
import envData from '../configs/envData';

config();

/**
 * @description This class is for JWT token generation and verification
 */
class JWTHelper {
  /**
   * @description This function generates JWT tokens
   * @param {object} userObject
   * @param {string} duration time that a token has before becoming invalid
   * @returns {string} token
   */
  static generateToken(userObject, duration) {
    if (!userObject) {
      throw new Error('Please supply a valid user object.');
    }
    const token = jsonWebToken.sign({ user: userObject }, envData.JWT_SECRET,
      {
        expiresIn: duration,
      });

    return token;
  }

  /**
   * @description This function generates JWT tokens
   * @param {object} tokenObject
   * @param {string} duration time that a token has before becoming invalid
   * @returns {string} token
   */
  static generateOtherToken(tokenObject, duration) {
    if (!tokenObject) {
      throw new Error('Please supply a valid user object.');
    }
    const token = jsonWebToken.sign({ ...tokenObject }, envData.JWT_SECRET,
      {
        expiresIn: duration,
      });

    return token;
  }

  /**
   * @description This function verifies and decodes JWT tokens
   * @param {string} userToken
   * @returns {Object} userObject
   */
  static verifyToken(userToken) {
    if (!userToken || typeof userToken !== 'string') {
      throw new Error('Please enter a valid token.');
    }
    try {
      const decodedToken = jsonWebToken.verify(userToken, envData.JWT_SECRET);
      return decodedToken;
    } catch (err) {
      return err;
    }
  }

  /**
* @description - This function hashes password
* @param {password} password to be hashed
* @return {string} hashed password
*/
  static hashPassword(password) {
    if (!password) throw new Error('No password defined');
    const hashed = bcrypt.hashSync(password, 10);
    return hashed;
  }

  /**
  * @description - compares hashed password to plain password
  * @param {string} password
  * @param {string} hashedpassword
  * @returns {Boolean} - Return true or false
  */
  static comparePassword(password, hashedpassword) {
    if (!password || !hashedpassword) {
      throw new Error('No password or hashedPassword defined');
    }
    const isPassword = bcrypt.compareSync(password, hashedpassword);
    return isPassword;
  }

  /**
   * @description Generate a random password for every user authenticated
   * @param {int} outputLength  lenght of the output expected
   * @returns {function} hashPassword
   */
  static generateRandomString(outputLength) {
    const idNum = outputLength;
    let textOutput = '';
    const poss = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < idNum; i += 1) {
      textOutput += poss.charAt(Math.floor(Math.random() * poss.length));
    }
    return textOutput;
  }

  /**
   * @returns {string} - return random numbers
   */
  static generateOTP() {
    if ((envData.NODE_ENV).toLowerCase() === 'qa') {
      return envData.QA_TOKEN || '000000';
    }
    return Math.floor(100000 + Math.random() * 900000);
  }
}

export default JWTHelper;
