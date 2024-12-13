import Logo from "./Logo";
import Menu from "./Menu";
import User from "./User";
import movie2 from "../../images/footbal.avif";
import Languages from "../ui/Languages";

const Header = () => {
let user = localStorage.getItem("user") || "";
    return <header className="fixed top-0 left-0 w-full h-20 bg-white flex justify-between items-center px-4 ">
        <Logo/>
        <Menu/>
        <Languages/>
        {user && <User/>}

        <img
            style={{filter: 'drop-shadow(2px 2px 10px gray)'}}
            className="w-[110px] rounded-full  cursor-pointer"
            src={movie2}

        />

    </header>;
};

export default Header