import { connection as knex } from '../index';

const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);
const findOneById = (id: number) => knex('users').select().where('id', id);
const createUser = (userObject: any) => knex('users').insert(userObject);

export default {
    findOneByEmail,
    findOneById,
    createUser
}