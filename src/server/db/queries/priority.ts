import { connection as knex } from '../index';

const getPriority = () => knex('priority').select();
const getOnePriority = (id: number) => knex('priority').select().where('id', id);

export default {
    getPriority,
    getOnePriority
}