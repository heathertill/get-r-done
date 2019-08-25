import * as React from 'react';
import { useState } from 'react';
import { json, SetAccessToken, ClearAccessToken, User } from '../../utils/api';
import { RouteComponentProps } from 'react-router-dom';


export interface LoginProps extends RouteComponentProps { }

const Login: React.SFC<LoginProps> = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(true)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            let result = await json('/auth/login', 'POST', {
                email,
                password
            })
            if (result) {
                SetAccessToken(result.token, { userid: result.userid, role: result.role })
                if (result.role) {
                    setLoginStatus(true);
                    history.push('/');
                    location.reload();
                }
            } else {
                setLoginStatus(false);
                ClearAccessToken();
            }
        } catch (e) {
            console.log(e)
        }
    };

    const notAllowed = () => {
        if (!loginStatus) {
            return <div className="alert alert-danger p-1 m-3">Invalid Credentials</div>
        }
    }

    return (
        <section>
            <form className="form-group"
                onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <button
                    type="submit"
                    className="btn btn-alert bg-warning m-3">Login</button>
                {notAllowed()}
            </form>
        </section>
    );
}

export default Login;