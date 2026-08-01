import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/api';
import MilestoneTable from '../components/home/MilestoneTable';
import ChoresTable from '../components/home/ChoresTable';
import Button from '../components/Button';

import { Delete, Flag, Pencil, Trash } from 'lucide-react'
import GoalForm from '../components/forms/GoalForm';
import Confirmation from '../components/Confirmation';
import { useOutletContext } from 'react-router-dom';

const Goal = () => {
    const { fetchGoals } = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [goal, setGoal] = useState(null)
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const fetchGoal = async () => {
        const response = await api.get(`/api/goals/${id}`);
        setGoal(response.data)
    }

    const editGoal = async (data) => {
        const response = await api.put(`/api/goals/${id}`, {
            title: data.title,
            priority: data.priority
        });
        setGoal(response.data);
    }

    const deleteGoal = async () => {
        try {
            const response = await api.delete(`/api/goals/${id}`)
        } catch (error) {
            alert(error)
        } finally {
            fetchGoals();
        }
    }

    useEffect(() => {
        fetchGoal();
    }, [id])

  return (
    <div className='rounded-[40px] border-2 border-green-500 p-3 md:p-16'>
        <div className='mb-2 border border-gray-300 shadow-sm bg-gray-50 w-max px-4 py-1 rounded-full'>
            Priority <span className='font-semibold'>{goal?.priority}</span>
        </div>
        <h3 className='heading flex items-center gap-2'>
            Goal: {goal?.title}
            <Flag size={30} />
        </h3>
        <div className='mt-2'>
            <h2 className='text-md text-gray-600'>Actions</h2>
            <div className='flex items-center gap-3'>
                <Button text={"Edit"} theme={"light"} icon={<Pencil />} action={() => setShowEdit(true)} />
                <Button text={"Delete"} theme={"hazard"} icon={<Trash />} action={() => setShowConfirmation(true)} />
                {
                    showEdit && <GoalForm defaultValues={{...goal}} onSubmit={editGoal} heading={"Edit this goal"} onClose={() => setShowEdit(false)} />
                }
                {
                    showConfirmation && <Confirmation message="Are you sure you want to delete this goal?" confirm={deleteGoal} onClose={() => setShowConfirmation(false)} />
                }
            </div>
        </div>
        <div className='overflow-x-auto mt-6'>
            <MilestoneTable fetchMilestones={fetchGoal} milestones={goal?.milestones} />
        </div>
        <div className='mt-6'>
            <ChoresTable fetchChores={fetchGoal} chores={goal?.chores} />
        </div>
    </div>
  )
}

export default Goal