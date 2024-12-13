import React, {useState} from 'react';


const User = () => {

   const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
    }
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div
            className="relative h-full flex justify-end items-center w-[200px] pr-2 bg-blue-200 text-white cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="text-2xl uppercase cursor-pointer">
                {user && user.username}
            </div>
            {isOpen && <div
                onClick={e => e.stopPropagation()}
                className="absolute top-full right-0 z-50 bg-black w-full flex flex-col items-end pr-2 min-h-[200px] text-2xl ">
                {token && <div onClick={logout}>
                    Logout
                </div>}
                <div>

                    Edit profile
                </div>
                <div>
                Settings
                </div>
                <div>
                    My profile
                </div>
            </div>}
        </div>
    );
};

export default User;