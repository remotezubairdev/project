import React, { useState } from 'react'
import { api } from './../../api/api';
import Button from '../Button';
import { CheckIcon, Pencil, Trash } from 'lucide-react';

const ChoresTable = ({ fetchChores, chores }) => {
    const [showEdit, setShowEdit] = useState();
    const [inputChore, setInputChore] = useState("");

    const handleChange = async (completed, chore) => {
        try {
            const response = await api.put(`/api/chores/${chore.id}`, {
                ...chore,
                completed: completed
            })
            fetchChores();
        } catch (error) {
            console.log(error?.response.data)
        }
    }

    const deleteChore = async (id) => {
        try {
            const response = await api.delete(`/api/chores/${id}`)
        } catch (error) {
            console.log(error?.response.data)
        } finally {
            fetchChores();
        }
    }

    const handleEdit = (chore) => {
        setInputChore(chore.title)
        setShowEdit(chore.id)
    }

    const confirmEdit = async (chore) => {
        try {
            const response = await api.put(`/api/chores/${chore.id}`, {
                goal: chore.goal,
                title: inputChore,
                milestone: chore.milestone,
                todo_on_date: chore.todo_on_date,
                completed: chore.completed
            })
        } catch (error) {
            console.log(error?.response.data)
        } finally {
            setShowEdit(false);
            fetchChores();
        }
    }

  return (
    <div className='max-h-90 overflow-y-scroll overflow-x-auto w-full'>
            <table className='w-full text-start'>
                <thead>
                    <tr className='bg-green-500'>
                        <th className='text-white text-start font-normal p-3 rounded-tl-lg'>Chores</th>
                        <th className='text-center text-white font-normal p-3'>Completed</th>
                        <th className='text-center text-white font-normal p-3 rounded-tr-lg'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        chores?.map(chore => (
                            <tr key={chore.id} className={`border border-gray-200`}>
                                <td className='border-r border-gray-200 p-3'>
                                    {
                                        showEdit === chore.id ? <input className='input' placeholder='edit' value={inputChore} onChange={(e) => setInputChore(e.target.value)} /> : chore.title
                                    }
                                </td>
                                <td className='p-3 border-r border-gray-200 text-center'>
                                    <input type='checkbox' className='cursor-pointer w-[20px] h-[20px]' checked={chore.completed} onChange={(e) => handleChange(e.target.checked, chore)} />
                                </td>
                                <td className='p-3 flex justify-center items-center gap-2'>
                                    {
                                        showEdit === chore.id ? <Button icon={<CheckIcon size={30} />} action={() => confirmEdit(chore)} /> : <Button theme={"light"} icon={<Pencil size={20} />} action={() => handleEdit(chore)} />
                                    }
                                    <Button theme={"hazard"} icon={<Trash size={20} />} action={() => deleteChore(chore.id)} />
                                </td>
                            </tr>
                        ))
                    }
                    {
                        chores?.length === 0 && (
                            <tr className={`border border-gray-200`}>
                                <td className='border-r border-gray-200 p-3'>
                                    No chores yet.
                                </td>
                                <td className='p-3 border-r border-gray-200'>
                                    ---
                                </td>
                                <td className='p-3'>
                                    ---
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}

export default ChoresTable