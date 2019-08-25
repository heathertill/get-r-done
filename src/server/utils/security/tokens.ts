import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import queries from '../../db';

export const CreateToken = async (payload: IPayload) => {
    let [tokenid] = await queries.Tokens.insertToken(payload.userid);
    payload.accesstokenid = tokenid;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    await queries.Tokens.updateToken(payload.accesstokenid, token);
    return token;
};
export const ValidToken = async (token: string) => {
    let payload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await queries.Tokens.findOne(payload.accesstokenid, token);
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
};
export const GenerateExpireDate = () => {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    return expireDate;
};
export const IsExpired = (expireDate: Date) => {
    let now = new Date();
    if (expireDate >= now) {
        return false;
    } else {
        return true;
    }
};
export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
};