import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmationDialog from "../components/Dialogs";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState(null);

  const deleteRestoreHandler = () => {
    console.log(`Action Type: ${type}`);
    if (type === "delete") {
      console.log(`Deleting task with ID: ${selected}`);
    } else if (type === "restore") {
      console.log(`Restoring task with ID: ${selected}`);
    } else if (type === "deleteAll") {
      console.log("Deleting all trashed tasks");
    } else if (type === "restoreAll") {
      console.log("Restoring all trashed tasks");
    }
    setOpenDialog(false);
  };
  

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    console.log("Action Type: restoreAll"); // Debugging log
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMsg("Do you want to delete this item permanently?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Trashed Tasks' />
          <div className='flex gap-2 md:gap-4 items-center'>
            <Button
              label='Restore All'
              icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={restoreAllClick}
            />
            <Button
              label='Delete All'
              icon={<MdDelete className='text-lg hidden md:flex' />}
              className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
              onClick={deleteAllClick}
            />
          </div>
        </div>
        <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <thead className='border-b border-gray-300'>
                <tr className='text-black text-left'>
                  <th className='py-2'>Task Title</th>
                  <th className='py-2'>Priority</th>
                  <th className='py-2'>Stage</th>
                  <th className='py-2 line-clamp-1'>Modified On</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((item) => (
                  <tr key={item._id} className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
                    <td className='py-2'>
                      <div className='flex items-center gap-2'>
                        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
                        <p className='w-full line-clamp-2 text-base text-black'>{item?.title}</p>
                      </div>
                    </td>
                    <td className='py-2 capitalize'>
                      <div className='flex gap-1 items-center'>
                        <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>{ICONS[item?.priority]}</span>
                        <span>{item?.priority}</span>
                      </div>
                    </td>
                    <td className='py-2 capitalize text-center md:text-start'>{item?.stage}</td>
                    <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>
                    <td className='py-2 flex gap-1 justify-end'>
                      <Button icon={<MdOutlineRestore className='text-xl text-gray-500' />} onClick={() => restoreClick(item._id)} />
                      <Button icon={<MdDelete className='text-xl text-red-600' />} onClick={() => deleteClick(item._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} msg={msg} setMsg={setMsg} type={type} setType={setType} onClick={deleteRestoreHandler} />
    </>
  );
};

export default Trash;
