import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_PAGE} from "../utils/routes";
import Background from "../images/gndak.jpg";
import Background1 from "../images/gndak.jpg";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let users = localStorage.getItem('users') || []

    const register = async () => {
        if(email && password){
            let user = {
                id: Math.random(),
                username,
                email,
                password
            }
            if(user){
                try{
                    const response = await axios.post('http://localhost:5000/users',user)
                    navigate(LOGIN_PAGE)
                }catch (e){
                    console.log(e.message)
                }
            }



            // window.location.reload()
        }
    }

    return (
        <div style={{backgroundImage:`url('${Background}')`}} className="bg-no-repeat bg-cover w-full h-full flex justify-center items-center bg-gray-400">
            <form action=""   className=' w-full h-[80vh] flex  justify-center items-center'>
                <div
                    className='gap-3 flex flex-col justify-center items-center  p-8 bg-white ... rounded-[80px] font-bold'>
                    <h1 className='text-xl font-bold'>Register</h1>
                    <input
                        className="border-2 border-black w-64 rounded-xl h-9"
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="border-2 border-black w-64 rounded-xl h-9"
                        type="email"
                        value={email}
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="border-2 border-black w-64 rounded-xl h-9"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label><input type='checkbox'/>Remember mee</label>

                    <button onClick={register} type='submit'
                            className='border border-black rounded-xl w-64 bg-red-600  hover:text-white '>Register
                    </button>
                    <p>Have an account <Link to={LOGIN_PAGE}
                                          className='underline text-blue-600'>Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;