import * as React from 'react';
import { Link } from 'react-router-dom';
import { User, ClearAccessToken } from '../../utils/api';

export interface NavbarProps { }

const Navbar: React.SFC<NavbarProps> = () => {

    const checkStatus = () => {
        if (User.userid !== null) {
            return <button className="text-white bg-dark border-dark" onClick={() => logout()}>Logout</button>
        } else if (User.userid === null) {
            return <Link className="text-white" to="/login">Login</Link>
        }
    };

    const logout = () => {
        ClearAccessToken();
        location.reload();
    };

    

    const allowNewTask = () => {
        if (User.userid !== null) {
            return <Link className="text-white" to="/newTask">New Task</Link>
        }
    }

    return (
        <section>
            <ul className="nav m-3 p-3 bg-dark justify-content-between">
                <div className="nav">
                    <li className="nav-item mx-3">
                        {checkStatus()}
                    </li>
                    <li className="nav-item mx-3">
                        <Link className="text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item mx-3">
                        {allowNewTask()}
                        {/* <Link className="text-white" to="/newTask">New Task</Link> */}
                    </li>
                </div>
                <li className="nav-item">
                    <Link className="text-white " to="/register">Register</Link>
                </li>
            </ul>
            <div className="jumbotron jumbotron-fluid shadow m-3">
                <div className="container-fluid">
                    <h1 className="text-center">Get 'r Done</h1>
                </div>
            </div>
        </section>
    );
}

export default Navbar;