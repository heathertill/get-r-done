import { connection as knex } from '../index';

const getAllCat = () => knex('categories').select();
const getOneCat = (id: number) => knex('categories').select().where('id', id);

export default {
    getAllCat,
    getOneCat
}