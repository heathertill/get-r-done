import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { json, User } from '../../utils/api';
import { useEffect } from 'react';

export interface NewTaskProps extends RouteComponentProps { }

interface Categories {
    id: number,
    name: string
}
interface Priorities {
    id: number,
    name: string
}

const NewTask: React.SFC<NewTaskProps> = ({ history }) => {

    const [userid, setUserid] = useState(undefined);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [priorities, setPriorities] = useState<Priorities[]>([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [categoryid, setCategoryid] = useState(null);
    const [priorityid, setPriorityid] = useState(null);
    const [due, setDue] = useState('');
    const [problem, setProblem] = useState(false);

    const handleNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let body = {
                userid,
                title,
                details,
                categoryid,
                priorityid,
                due
            }
            let result = await json('/api/tasks', 'POST', body);
            if (result) {
                history.push('/');
            } else if (!result) {
                setProblem(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getInfo = async () => {
        setUserid(User.userid)
        setProblem(false);
        try {
            let getCategories = await json('/api/categories');
            let getPriorities = await json('/api/priority');
            setCategories(getCategories);
            setPriorities(getPriorities);
        } catch (e) {
            console.log(e);
        }
    };

    const newTaskProblem = () => {
        if (problem === true) {
            return (
                <>
                    <div className="alert alert-danger p-1 m-3 text-center">
                        <div className="m-2">Oops! There was a problem, please try again!</div>
                        <button className="btn btn-warning"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => history.push('/')}>Return to Home Page</button>
                    </div>
                </>
            )
        }
    }


    useEffect(() => { getInfo() }, [])

    return (
        <section>
            <form className="form-group border shadow m-3 p-3"
                onSubmit={(e) => handleNewTask(e)}>
                <h2 className="text-center">New Task</h2>
                <label className="my-1" htmlFor="title">Title</label>
                <input type="text" className="form-control" value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                <label className="my-1" htmlFor="details">Details</label>
                <input type="text" className="form-control" value={details}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails(e.target.value)} />
                {/* <label htmlFor="categories">Select Category</label> */}
                <select className="form-control my-3"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryid(e.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map(categoryOpt => {
                        return (
                            <option value={categoryOpt.id} key={categoryOpt.id}>{categoryOpt.name}</option>
                        )
                    })}
                </select>
                {/* <label htmlFor="priority">Select Priority</label> */}
                <select className="form-control my-3"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityid(e.target.value)}>
                    <option value="">Select Priority</option>
                    {priorities.map(priorityOpt => {
                        return (
                            <option value={priorityOpt.id} key={priorityOpt.id}>{priorityOpt.name}</option>
                        )
                    })}
                </select>
                <label htmlFor="due">Due</label>
                <input type="date" className="form-control mb-2" value={due}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setDue(e.target.value)}/>
                <button className="btn btn-warning my-2" type="submit"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDue(e.target.value)}>Submit</button>
                {newTaskProblem()}
            </form>
        </section>
    );
}

export default NewTask;