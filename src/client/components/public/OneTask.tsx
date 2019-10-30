import * as React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Task } from './Tasks';
import { json } from '../../utils/api'

export interface OneTaskProps extends RouteComponentProps<{ id: string }> { }

const OneTask: React.SFC<OneTaskProps> = ({ match: { params: { id } } }) => {

    const [task, setTask] = useState<Task>({
        id: null,
        userid: null,
        name: null,
        title: null,
        details: null,
        categoryname: null,
        categoryid: null,
        priorityname: null,
        priorityid: null,
        _created: null,
        due: null
    });

    const getTask = async () => {
        try {
            let task = await json(`/api/tasks/${id}`);
            setTask(task);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { getTask() }, [id]);

    return (
        <section>
            <div className="card border m-3 p-2">
                <div className="card-body">
                    <h5 className="card-title">Task: {task.title}</h5>
                    <h6 className="card-suptitle">Created by: {task.name}</h6>
                    <p className="card-text">Details: {task.details}</p>
                    <p className="card-text">Due: {moment(task.due).format('MMMM DD, YYYY')}</p>
                    <h4>
                        <span className="badge badge-secondary m-2">{task.categoryname}</span>
                        <span className="badge badge-secondary m-2">{task.priorityname}</span>
                    </h4>
                    <Link to={`/edit/${task.id}`} className="btn btn-warning">Edit Task</Link>
                </div>
            </div>
        </section>
    );
}

export default OneTask;
