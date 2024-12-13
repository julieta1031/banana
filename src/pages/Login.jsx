import React, { useEffect, useState } from 'react';
import { HOME_PAGE, REGISTER_PAGE } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Background from '../images/marzadasht.jpg';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
   const [users, setUsers] = useState([]);
    const [players, setPlayers] = useState([]);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(()=> response.data)
                return response.data
            } catch (e) {
                console.log("Error fetching users:", e.message);
            }
        };
        getUsers();


    }, []);
    console.log(users)


    const handleToggle = () => {
        setType(type === 'password' ? 'text' : 'password');
        setIcon(type === 'password' ? eye : eyeOff);
    };

    const login = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (email && password) {
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store token and user in local storage
                localStorage.setItem('token', 'your-jwt-token-here');
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('players', JSON.stringify(players));

                // Redirect to home page after successful login
                navigate(HOME_PAGE);
            } else {
                alert("User not found. Please check your credentials.");
            }
        } else {
            alert("Please enter both email and password.");
        }
    };

    return (
        <div style={{ backgroundImage: `url('${Background}')` }} className="bg-no-repeat bg-cover w-full h-full flex justify-center items-center bg-black">
            <form onSubmit={login} className='w-full h-[80vh] flex justify-center items-center'>
                <div className='gap-3 flex flex-col justify-center items-center p-8 bg-white shadow-lg rounded-[40px] font-bold'>
                    <h1 className='text-xl font-bold'>Login</h1>
                    <input
                        className="border-2 border-black w-64 rounded-xl h-9"
                        type="email"
                        value={email}
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="mb-4 flex relative">
                        <input
                            className="border-2 border-black w-64 rounded-xl h-9"
                            type={type}
                            value={password}
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={handleToggle}>
                            <Icon icon={icon} size={25} />
                        </span>
                    </div>
                    <label>
                        <input
                            type='checkbox'
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <a href='#' className='underline text-blue-600'>Forgot password?</a>
                    <button type='submit' className='border border-black rounded-xl w-64 bg-red-600 hover:text-white'>
                        Login
                    </button>
                    <p>Don't have an account? <a href={REGISTER_PAGE} className='underline text-blue-600'>Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
