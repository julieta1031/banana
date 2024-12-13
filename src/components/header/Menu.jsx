import React from 'react';
import {privateRoutes, publicRoutes} from "../../utils/routes";
import {Link, useLocation} from "react-router-dom";
import {Icon} from 'react-icons-kit'
import {user} from 'react-icons-kit/metrize/user'

const ExampleMenu = ({menu}) => {

    const {pathname} = useLocation()

    return <ul className="flex gap-2">
        {
            menu.map(page => {
                return <li key={page.path} >
                    <Link to={page.path}
                          className={`text-xl ${pathname === page.path ? "text-black" : "text-red-500 hover:text-blue-900"}`}>
                        {page.name}
                    </Link>
                </li>
            })
        }
    </ul>
}
const Menu = () => {

    const [Open, setOpen] = React.useState(false);
    const handleToggle = () => {
        if (!Open) {
            setOpen(true)

        } else {
            setOpen(false)
        }

        console.log(Open)
    }

    const token = localStorage.getItem('token')

    return (
        <nav>
            <ul className="flex gap-2 " >
                {
                    !token ? <span
                            onClick={handleToggle}
                            className='flex flex-col items-center justify-center
                            w-[200px] h-full
                            '
                        >
                        <h1>Marat</h1>

                            <Icon icon={user} size={45}/>
                            {Open && <div>
                                <ExampleMenu menu={publicRoutes}/>
                            </div>}
                        </span>
                        :
                        <ExampleMenu menu={privateRoutes} />
                }
            </ul>
        </nav>
    );
};

export default Menu;