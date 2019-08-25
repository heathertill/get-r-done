import { connection as knex } from '../index';

const findOne = (id: number, token: string) => knex('tokens').where('id', id).andWhere('token', token).select();
const insertToken = (userid: number) => knex('tokens').insert({ userid });
const updateToken = (id: number, token: string) => knex('tokens').where('id', id).update('token', token);

export default {
    findOne,
    insertToken,
    updateToken
}