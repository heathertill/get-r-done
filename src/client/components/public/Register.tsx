import * as React from 'react';
import { useState, } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { json, SetAccessToken } from '../../utils/api';

export interface RegisterProps extends RouteComponentProps {

}

const Register: React.SFC<RegisterProps> = ({history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let body = {
            name,
            email,
            password
        }
        try {
            let result = await json('/auth/register', 'POST', body)
            if (result) {
                try {
                    let result2 = await json('/auth/login', 'POST', body)
                    if (result2) {
                        SetAccessToken(result2.token, { userid: result2.userid, role: result2.role })
                    }
                    history.push('/')
                } catch (e) {
                    console.log(e)
                }
            } else {
                setRegistered(false);
            }
        } catch (e) {
            console.log(e)
        }
    };

    const registerError = () => {
        if (registered === false) {
            return <div className="alert alert-danger m-3 p-1">There was a problem registering! Please try again.</div>
        }
    }

    return (
        <section>
            <form className="form-group border shadow p-3 m-3"
            onSubmit={(e) => handleRegister(e)}>
                <label className="mb-1" htmlFor="name">Name</label>
                <input type="text" className="form-control mb-2" value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <label className="mb-1" htmlFor="email">Email</label>
                <input type="email" className="form-control mb-2" value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <label className="mb-1" htmlFor="password">Password</label>
                <input type="password" className="form-control" value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-warning m-3">Register</button>
                {registerError()}
            </form>
        </section>
    );
}

export default Register;