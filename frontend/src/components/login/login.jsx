import { useState } from 'react';
import { Link } from 'react-router-dom'
import './login.css';
import {FaLock, FaEnvelope} from "react-icons/fa";
import { loginUser } from '../../services/auth_api.js';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handle_submit = async (event) => {
        event.preventDefault();
        try {
                const data = await loginUser({ email, password })
                alert(`Token: ${data.token}`)
            } catch (err) {
                alert(err)
            }
    }

    const handle_email_change = (event) => {
        setEmail(event.target.value);
    }

    const handle_password_change = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login">
            <form className="loginForm" onSubmit={handle_submit}>
                <h2>Login do sistema</h2>
                <div className='input-field'>
                    <input type="email" placeholder="E-mail" onChange={handle_email_change}/>
                    <FaEnvelope className="icon"/> 
                </div>
                <div className='input-field'>
                    <input type="password" placeholder="Senha" onChange={handle_password_change}/>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Entrar</button>

                <div className="signup-link">
                    <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
            </form>
        </div>
    );
};
  
export default Login;