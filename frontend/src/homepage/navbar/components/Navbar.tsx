import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
    children: JSX.Element;
};

const NavbarTab: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="flex items-center">
                <div className="flex justify-center items-center rounded-md h-12 w-40 cursor-pointer">
                    {children}
                </div>
            </div>
        </>
    );
};

export const Navbar: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    function handleClick() {
        setMenuVisible(!menuVisible);
    }
    return (
        <>
            <div className="flex mt-20 ml-10 mr-10 px-10 py-8 justify-between rounded-md">
                <div className="flex justify-between w-1/2">
                    <NavbarTab>
                        <Link to="/">Home</Link>
                    </NavbarTab>
                    <NavbarTab>
                        <Link to="/problems">Problems</Link>
                    </NavbarTab>
                    <NavbarTab>
                        <Link to="/contest">Contest</Link>
                    </NavbarTab>
                </div>
                <div>
                    <div
                        className="bg-gray-100 rounded-full w-[4rem] h-[4rem] flex items-center justify-center cursor-pointer"
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-user fa-3x"></i>
                    </div>
                </div>
                {menuVisible && (
                    <div className="top-[177px] right-[78px] absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
                        <div className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                            Profile
                        </div>
                        <div className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                            Signout
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
