import { X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../api/api';

const CreateNewGoal = ({ setGoals, setShowCreateGoal }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const submitGoal = async (data) => {
        try {
            const response = await api.post("/api/goals", {
                title: data.title,
                priority: data.priority
            })
            setGoals(prev => [...prev, response.data])
            setShowCreateGoal(false);
            reset();
        } catch (error) {
            alert("Goal could not be created", error)
        }
    }
  return (
    <div className='z-3 fixed inset-5 md:inset-20 xl:inset-50 container shadow-xl'>
        <div className='border-b border-gray-300 pb-3 flex justify-between items-center'>
            <h1 className='md:heading'>
                Create a New Main Goal
            </h1>
            <button className='cursor-pointer' onClick={() => setShowCreateGoal(false)}>
                <X size={30} />
            </button>
        </div>
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 mt-12'>
            <form className='space-y-3' onSubmit={handleSubmit(submitGoal)}>
                    <h3>Your Main Goal:</h3>
                    <input 
                    autoFocus
                    id='maingoal'
                    type='text' 
                    className=' input md:input-lg' 
                    placeholder='e.g. Win a Nobel Prize'
                    {...register("title", {
                        required: "You must enter a goal"
                    })}
                    />
                    <div className='space-x-4'>
                        <h3>Priority:</h3>
                        <select className='input-select' {...register("priority", {
                            required: "You must select a priority"
                        })}>
                            <option value="H">High</option>
                            <option value="M">Medium</option>
                            <option value="L">Low</option>
                        </select>
                        <input type="submit" value={"Create"} className='button-lg' />
                    </div>
            </form>
            <div>
                <h4 className='heading'>TIP:</h4>
                <p className='paragraph'>Make sure your goals are short, abstract and ambitious. These long-term goals 
                    can then be broken down into milestones and daily actions (chores).
                </p>
            </div>
        </div>
    </div>
  )
}

export default CreateNewGoal