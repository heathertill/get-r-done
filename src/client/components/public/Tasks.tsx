import * as React from 'react';
import { Link } from 'react-router-dom';
import * as io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { json } from '../../utils/api';
import moment from 'moment';

export interface TasksProps { }

export interface Task {
    id: number,
    userid: number,
    name: string,
    title: string,
    details: string,
    categoryname: string,
    categoryid: number,
    priorityname: string,
    priorityid: number,
    _created: Date,
    due: Date
}
const Tasks: React.SFC<TasksProps> = () => {
    
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async () => {
        try {
            let tasks = await json('api/tasks');
            setTasks(tasks)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => { getTasks() }, []);

    useEffect(() => {
        let socket = io.connect();
        socket.on('newTask', () => getTasks());
        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <article className="container-fluid">
            <div className="row">
                <div className="card-deck justify-content-center">
                    {tasks.map(task => {
                        return (
                            <div key={task.id} className="col-md-3 m-2 p-2">
                                <div  className="card mx-0 border shadow">
                                    <div className="card-body">
                                        <h5 className="card-title" >{task.title}</h5>
                                        <h6 className="card-subtitle">{task.name}</h6>
                                        <p className="card-text">Due: {moment(task.due).format('MMMM DD, YYYY')}</p>
                                        <h4>
                                            <span className="badge badge-secondary m-2">{task.categoryname}</span>
                                            <span className="badge badge-secondary m-2">{task.priorityname}</span>
                                        </h4>
                                        <div className="card-footer justify-content-center">
                                            <Link to={`/tasks/${task.id}`} className="btn btn-warning">View Task</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </article>
    );
}

export default Tasks;
