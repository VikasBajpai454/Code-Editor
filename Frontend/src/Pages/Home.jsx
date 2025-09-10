import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import GridCard from "../Components/GridCard";
import ListCard from "../Components/ListCard";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../Helper";

const Home = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [projTitle, setProjTitle] = useState("");
    const [isLightMode, setIsLightMode] = useState(false);

    const navigate = useNavigate();

    const [isGridLayout, setisGridLayout] = useState(false);
    const [isCreateModelShow, setIsCreateModelShow] = useState(false);


    const filteredData = data ? data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const changeTheme = () => {
        if (isLightMode) {
            document.querySelector(".EditorNavbar").style.background = "#141414";
            document.body.classList.remove("LightMode");
            setIsLightMode(false);
        }
        else {
            document.querySelector(".EditorNavbar").style.background = "#f4f4f4";
            document.body.classList.add("LightMode");
            setIsLightMode(true);
        }
    }

    const createProj = (e) => {
        if (projTitle === "") {
            alert("Please Enter Project Title");
        } else {
            fetch(api_base_url + "/createProject", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: projTitle,
                    userId: localStorage.getItem("userId")
                })
            }).then(res => res.json()).then(data => {
                if (data.success) {
                    setIsCreateModelShow(false);
                    setProjTitle("");
                    navigate(`/Editor/${data.projectId}`); // Corrected the navigation path
                } else {
                    alert("Something Went Wrong");
                }
            });
        }
    };

    const getProj = () => {
        fetch(api_base_url + "/getProjects", {
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
                setData(data.projects);
            } else {
                setError(data.message);
            }
        });
    };

    useEffect(() => {
        getProj();
    }, []);


    const [userData, setUserData] = useState(null);
    const [userError, setUserError] = useState("");;

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
                setUserData(data.user);
            }
            else {
                setUserError(data.message);
            }
        })
    }, [])

    return (
        <>
            <Navbar isGridLayout={isGridLayout} setIsGridLayout={setisGridLayout} isLightMode={isLightMode} setIsLightMode={setIsLightMode} />
            <div className='home flex items-center justify-between px-[100px] my-[40px]'>
                <h2 className='text-2xl'>Hi, {userData ? userData.username : ""} 👋</h2>
                <div className='flex items-center gap-1'>
                    {/* Search Bar */}
                    <div className="inputBox !w-[350px]">
                        <input
                            type="text"
                            placeholder='Search Here... !'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button onClick={() => { setIsCreateModelShow(true) }} className='btnBlue rounded-[5px] mb-4 text-[20px] !p-[5px] !px-[10px]'>+</button>
                </div>
            </div>

            <div className="cards">
                {
                    isGridLayout ?
                        <div className='grid px-[100px]'>
                            {
                                filteredData.length > 0 ? filteredData.map((item, index) => (
                                    <GridCard key={index} item={item} />
                                )) : <p>No projects found</p>
                            }
                        </div>
                        : <div className='list px-[100px]'>
                            {
                                filteredData.length > 0 ? filteredData.map((item, index) => (
                                    <ListCard key={index} item={item} />
                                )) : <p>No projects found</p>
                            }
                        </div>
                }
            </div>

            {
                isCreateModelShow ? <div className="createModelCon fixed top-0 left-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
                    <div className="createModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
                        <h3 className="text-2xl">Create New Project</h3>

                        <div className="inputBox !bg-[#202020] mt-4">
                            <input onChange={(e) => { setProjTitle(e.target.value) }} value={projTitle} type="text" placeholder="Project Title " />
                        </div>

                        <div className="flex items-center gap-[10px] w-full mt-2">
                            <button onClick={createProj} className="btnBlue rounded-[5px] w-[49%] mb-4 text-[20px] !p-[5px] !p-[10px] !py-[10px]">Create</button>
                            <button onClick={() => { setIsCreateModelShow(false) }} className="btnBlue !bg-[#1A1919] rounded-[5px] mb-4 w-[49%] text-[20px] !p-[5px] !px-[10px] !py-[10px]">Cancel</button>
                        </div>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default Home