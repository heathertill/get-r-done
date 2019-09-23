import * as React from 'react';
import { json } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom'
import { useState, useEffect } from 'react';
import moment from 'moment';

export interface EditTaskProps extends RouteComponentProps<{ id: string }> { }

interface Categories {
    id: number,
    name: string
}
interface Priorities {
    id: number,
    name: string
}

const EditTask: React.SFC<EditTaskProps> = ({ history, match: { params: { id } } }) => {

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [categoryid, setCategoryid] = useState(undefined);
    const [categoryname, setCategoryname] = useState('')
    const [priorityid, setPriorityid] = useState(undefined);
    const [priorityname, setPriorityname] = useState('')
    const [due, setDue] = useState();
    const [categories, setCategories] = useState<Categories[]>([]);
    const [priorities, setPriorities] = useState<Priorities[]>([]);

    const getTask = async () => {
        try {
            let task = await json(`/api/tasks/${id}`);
            let category = await json('/api/categories')
            let priority = await json('/api/priority')
            setCategories(category);
            setCategoryid(task.categoryid)
            setPriorities(priority);
            setPriorityid(task.priorityid)
            setTitle(task.title);
            setDetails(task.details);
            setDue(task.due);
            console.log('due', due, task.due)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { getTask() }, [id]);

    const handleEdit = async () => {
        let data = {
            title,
            details,
            categoryid,
            priorityid,
            due
        }
        console.log('data', data)
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                }
            });
            history.replace('/');
        } catch (e) {
            console.log(e)
        }
    };

    const handleDelete = async () => {
        try {
            await json(`/api/tasks/${id}`, 'DELETE');
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <section>
            <div className="form-group border p-3 shadow">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control m-2" value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                <label htmlFor="details">Details</label>
                <textarea className="form-control m-2" value={details} rows={8}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)} />
                <label htmlFor="category">Category</label>
                <select className="form-control m-2" value={categoryid} placeholder={categoryname}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryid(Number(e.target.value))}>
                    {categories.map(categoryOpt => {
                        return (
                            <option value={categoryOpt.id} key={categoryOpt.id}>{categoryOpt.name}</option>
                        )
                    })}
                </select>
                <label htmlFor="priority">Priority</label>
                <select className="form-control m-2" value={priorityid} placeholder={priorityname}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityid(Number(e.target.value))}>
                    {priorities.map(prioritiesOpt => {
                        return (
                            <option value={prioritiesOpt.id} key={prioritiesOpt.id}>{prioritiesOpt.name}</option>
                        )
                    })}
                </select>
                <label htmlFor="due">Due</label>
                <input type="date" className="form-control" value={moment(due).format('YYYY-MM-D')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDue(e.target.value)} />
                <button className="btn btn-info m-2"
                    onClick={handleEdit}>Edit</button>
                <button className="btn btn-info m-2"
                    onClick={handleDelete}>Delete Task</button>
            </div>
        </section>
    );
}

export default EditTask;