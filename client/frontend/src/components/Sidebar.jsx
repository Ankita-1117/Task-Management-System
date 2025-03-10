import React from 'react';
import { MdDashboard, MdOutlineAddTask, MdOutlinePendingActions, MdSettings, MdTaskAlt } from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/sidebarSlice";

const Sidebar = () => {
    const authState = useSelector((state) => state.auth) || {}; // ✅ FIXED fallback
    const { user } = authState;
    console.log("Auth State in Sidebar:", authState); // Debugging Log

    const dispatch = useDispatch();
    const location = useLocation();
  
    const path = location.pathname.split("/")[1];

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    };

    const linkData = [
      { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
      { label: "Tasks", link: "tasks", icon: <FaTasks /> },
      { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
      { label: "In Progress", link: "in-progress/in-progress", icon: <MdOutlinePendingActions /> },
      { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
      { label: "Team", link: "team", icon: <FaUsers /> },
      { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
    ];

    return (
      <div className='w-full h-full flex flex-col gap-6 p-5'>
        <h1 className='flex gap-1 items-center'>
          <p className='bg-blue-600 p-2 rounded-full'>
            <MdOutlineAddTask className='text-white text-2xl font-black' />
          </p>
          <span className='text-2xl font-bold text-black'>TaskMe</span>
        </h1>
        <div className='flex-1 flex flex-col gap-y-5 py-8'>
          {linkData.map((link) => (
            <Link to={link.link} key={link.label} className={`w-full flex gap-2 p-2 rounded-full items-center ${path === link.link ? "bg-blue-700 text-white" : ""}`}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    );
};

export default Sidebar;
