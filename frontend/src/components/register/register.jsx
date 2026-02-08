import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import './register.css';
import {FaUser, FaLock, FaEnvelope} from "react-icons/fa";
import { registerUser } from '../../services/auth_api.js';



const Register = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handle_submit = async (event) => {
        event.preventDefault();
        try {
                await registerUser({name, email, password})
                navigate("/")
            } catch (err) {
                alert(err.message)
            }
    }

    const handle_name_change = (event) => {
        setName(event.target.value);
    }

    const handle_email_change = (event) => {
        setEmail(event.target.value);
    }

    const handle_password_change = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="register">
            <form className="register_form" onSubmit={handle_submit}>
                <div className='titulo'>
                    <h1>Cadastro no sistema</h1>    
                </div>
                <div className='input-field'>
                    <input type="text" placeholder="Nome" onChange={handle_name_change}/>
                    <FaUser className="icon"/> 
                </div>
                <div className='input-field'>
                    <input type="email" placeholder="E-mail" onChange={handle_email_change}/>
                    <FaEnvelope className="icon"/> 
                </div>
                <div className='input-field'>
                    <input type="password" placeholder="Senha" onChange={handle_password_change}/>
                    <FaLock className="icon"/>
                </div>
                <button type="submit">Criar Conta</button>
            </form>
        </div>
    );
};
  
export default Register;