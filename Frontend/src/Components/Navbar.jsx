import React, { useEffect, useState } from "react";
import logo from "../Images/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { MdLightMode } from 'react-icons/md';
import { BsGridFill } from 'react-icons/bs';
import { api_base_url, toggleClass } from "../Helper";

const Navbar = ({ isGridLayout, setIsGridLayout, isLightMode, setIsLightMode }) => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(api_base_url + "/getUserDetails", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("userId")
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setData(data.user);
            }
            else {
                setError(data.message);
            }
        })
    }, [])

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    }

    const toggleLightMode = () => {
        setIsLightMode(!isLightMode);
        document.body.classList.toggle("light-mode", !isLightMode);
        document.querySelector(".navbar").style.background = !isLightMode ? "#f4f4f4" : "#141414";
        document.querySelector(".dropDownNavbar").style.background = !isLightMode ? "#f4f4f4" : "#1A1919";
        document.querySelector(".home").style.background = !isLightMode ? "#f4f4f4" : "#141414";
        document.querySelector(".cards").style.background = !isLightMode ? "#f4f4f4" : "#141414";
        document.querySelector(".createModelCon").style.background = !isLightMode ? "rgba(0,0,0,0.1)" : "rgba(20,20,20,0.9)";
        document.querySelector(".inputBox").style.background = !isLightMode ? "#fff" : "#202020";
        document.querySelector(".btnBlue").style.background = !isLightMode ? "#00AEEF" : "#1A1919";
    }

    return (
        <>
            <div className="navbar flex  items-center justify-between px-[100px] h-[80px] bg-[#141414]">
                <div className="logo">
                    <img className='w-[150px] cursor-pointer' src={logo} alt="" />
                </div>
                <div className="links flex items-center gap-2">
                    <Link>Home</Link>
                    <Link>About</Link>
                    <Link>Contacts</Link>
                    <Link>Services</Link>
                    <button onClick={logout} className='btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600'>Logout</button>
                    <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden"); }} name={data ? data.name : ""} size="40" round="50%" className="cursor-pointer ml-2"></Avatar>
                </div>

                <div className='dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg/50 p-[10px] bg-[#1A1919] w-[150px] h-[160px]'>
                    <div className="py-[10px] border-b-[1px] border-b-[#fff]">
                        <h3 className="text-[17px]" style={{ lineHeight: 1 }}>{data ? data.name : ""}</h3>
                    </div>
                    <i onClick={toggleLightMode} className="flex items-center gap-2 mt-3 mb-2 cursor-pointer" style={{ fontStyle: "normal" }}>
                        <MdLightMode className="text-[20px]" />{isLightMode ? "Dark Mode" : "Light Mode"}
                    </i>
                    <i onClick={() => setIsGridLayout(!isGridLayout)} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}>
                        <BsGridFill className='text-[20px]' /> {isGridLayout ? "List" : "Grid"} layout
                    </i>
                </div>
            </div>
        </>
    )
}

export default Navbar