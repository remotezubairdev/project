import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { api } from './../../api/api';
import { DatePicker } from '../datepickers/DatePicker';

const NewChoreForm = ({ actionCompleted, presetGoal, setChores, setShowCreateChore }) => {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [goals, setGoals] = useState(null);
    const [milestones, setMilestones] = useState(null);
    const [selectedDate, setSelectedDate] = useState();

    const fetchGoals = async () => {
        const response = await api.get("/api/goals");
        setGoals(response.data)
    }

    const fetchMilestones = async (id) => {
        const response = await api.get(`/api/milestones?goal=${id}`);
        setMilestones(response.data)
    }

    const submitChoreForm = async (data) => {
        try {
            const response = await api.post("/api/chores", {
                goal: data.goal,
                title: data.chore,
                milestone: data.milestone,
                todo_on_date: selectedDate.toISOString().split("T")[0],
            })
            setChores(chores => [...chores, response.data])
            if (actionCompleted) {
                actionCompleted();
            }
        } catch (error) {
            console.log(error)
        } finally {
            reset();
            setShowCreateChore(false);
        }
    }

    useEffect(() => {
        fetchGoals();
    }, [])
  return (
    <form onSubmit={handleSubmit(submitChoreForm)} className='flex gap-20'>
        <div className='space-y-2'>
            <div className='space-x-4'>
                <label htmlFor="goal">
                    Goal:
                </label>
                <select 
                id='goal' 
                className='input-select' 
                {...register("goal", {
                    required: "You must select a goal"
                })}
                onChange={(e) => fetchMilestones(e.target.value)}
                >
                    <option>---</option>
                    {
                        goals?.map(goal => <option selected={goal.title === presetGoal} key={goal.id} value={goal.id}>{goal.title}</option>)
                    }
                </select>
                {
                    goals?.length === 0 && <p className='paragraph text-yellow-600'>You don't have any goals yet. Create goals and milestones first to create a chore.</p>
                }
            </div>
            <div className='space-x-4'>
                { errors.milestone && <p className='text-red-500'>{errors.milestone.message}</p>}
                <label htmlFor="milestone">
                    Milestone:
                </label>
                <select 
                id='milestone' 
                className='input-select'
                {...register("milestone", {
                    required: "You don't have a milestone set for this goal"
                })}
                >
                    <option>---</option>
                    {
                        milestones?.map(milestone => <option key={milestone.id} value={milestone.id}>{milestone.title}</option>)
                    }
                </select>
                {
                    milestones?.length === 0 && <p className='paragraph text-yellow-600'>You don't have any milestones yet. Create milestones for your goals first to create a chore.</p>
                }
            </div>
            <div className='space-x-4'>
                <label htmlFor="chore">
                    Chore:
                </label>
                <input 
                type="text" 
                className='input md:input-lg'
                placeholder='e.g. Read one page of CS Theory'
                {...register("chore", {
                    required: "You must enter a chore"
                })}
                />
            </div>
            <div>
            </div>
            <DatePicker selected={selectedDate} setSelected={setSelectedDate} />
            <input type="submit" value={"Create this Chore"} className='button-lg' />
        </div>
    </form>
  )
}

export default NewChoreForm