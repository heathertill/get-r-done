import { connection as knex } from '../index';

const all = () => knex('tasks').select('tasks.id', 'tasks.userid', 'users.name', 'tasks.title', 'tasks.details', 'categories.name as categoryname', 'priority.name as priorityname', 'tasks._created', 'tasks.due').join('categories', 'tasks.categoryid', '=', 'categories.id').join('priority', 'tasks.priorityid', '=', 'priority.id').join('users', 'tasks.userid', '=', 'users.id');
const one = (id: number) => knex('tasks').select('tasks.id', 'tasks.userid', 'users.name', 'tasks.title', 'tasks.details', 'categories.name as categoryname', 'tasks.categoryid', 'priority.name as priorityname', 'tasks.priorityid', 'tasks._created', 'tasks.due').join('categories', 'tasks.categoryid', '=', 'categories.id').join('priority', 'tasks.priorityid', '=', 'priority.id').join('users', 'tasks.userid', '=', 'users.id').where('tasks.id', id);
const newTask = (taskBody: any) => knex('tasks').insert(taskBody);
const updateTask = (taskBody: any, id: number) => knex('tasks').where('id', id).update(taskBody);
const deleteTask = (id: number) => knex('tasks').where('id', id).del();

export default {
    all,
    one,
    newTask,
    updateTask,
    deleteTask
}