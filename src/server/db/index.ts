import config from '../config';
import * as knex from 'knex';

import Categories from './queries/categories';
import Priority from './queries/priority';
import Tokens from './queries/tokens';
import Tasks from './queries/tasks';
import Users from './queries/users';

export const connection = knex(config.knex);

export default {
    Categories,
    Priority,
    Tokens,
    Tasks,
    Users
}