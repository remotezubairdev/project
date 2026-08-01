import React, { useState } from 'react'
import ProgressBar from '../ProgressBar'
import { api } from '../../api/api'
import Button from '../Button';
import { CheckIcon, Pencil, Trash } from 'lucide-react';

const MilestoneTable = ({ milestones, fetchMilestones }) => {
    const [showEdit, setShowEdit] = useState();
    const [inputMilestone, setInputMilestone] = useState("");

    const deleteMilestone = async (id) => {
        const response = await api.delete(`/api/milestones/${id}`);
        fetchMilestones();
    }

    const handleEdit = (milestone) => {
        setInputMilestone(milestone.title)
        setShowEdit(milestone.id)
    }

    const confirmEdit = async (milestone) => {
        try {
            const response = await api.put(`/api/milestones/${milestone.id}`, {
                title: inputMilestone,
                goal: milestone.goal,
                progress: milestone.progress,
                deadline: milestone.deadline,
                user: milestone.user
            })
        } catch (error) {
            console.log(error?.response.data)
        } finally {
            setShowEdit(false);
            fetchMilestones();
        }
    }

  return (
    <table className='md:text-sm text-sm w-full overflow-x-auto overflow-y-scroll text-left'>
            <thead>
                <tr className='bg-yellow-500 text-white'>
                    <th className='p-6 font-normal md:heading rounded-tl-xl'>
                        Milestones
                    </th>
                    <th className='p-6 font-normal'>
                        Progress
                    </th>
                    <th className='p-6 font-normal'>
                        Leads to
                    </th>
                    <th className='p-6 font-normal'>
                        Deadline
                    </th>
                    <th className='p-6 font-normal rounded-tr-xl'>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className='border-r border-l border-gray-200'>
                {
                    milestones?.map(milestone => (
                        <tr key={milestone.id} className='border-b border-gray-200'>
                            <td className='p-6'>
                                {
                                    showEdit === milestone.id ? <input className='input' placeholder='Edit' value={inputMilestone} onChange={(e) => setInputMilestone(e.target.value)} /> : milestone.title
                                }
                            </td>
                            <td className='p-6'>
                                <ProgressBar progress={milestone.progress} />
                            </td>
                            <td className='p-6'>{milestone.goal.title}</td>
                            <td className='p-6'>
                                {milestone.deadline}
                            </td>
                            <td className='p-3 flex justify-center items-center gap-2'>
                                {
                                    showEdit === milestone.id ? <Button icon={<CheckIcon size={30} />} action={() => confirmEdit(milestone)} /> : <Button theme={"light"} icon={<Pencil size={20} />} action={() => handleEdit(milestone)} />
                                }
                                <Button theme={"hazard"} icon={<Trash size={20} />} action={() => deleteMilestone(milestone.id)} />
                            </td>
                        </tr>
                    ))
                }
                {
                    milestones?.length === 0 && (
                        <tr className='border-b border-gray-200'>
                            <td className='p-6'>No milestones yet.</td>
                            <td className='p-6'>
                                ---
                            </td>
                            <td className='p-6'>
                                ---
                            </td>
                            <td className='p-6'>
                                ---
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
  )
}

export default MilestoneTable