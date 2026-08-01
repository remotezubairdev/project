import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../api/api';
import { DatePicker } from '../datepickers/DatePicker';

const CreateNewGoal = ({ actionCompleted, presetGoal, presetMilestone, setShowCreateMilestone, setMilestones }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [goals, setGoals] = useState(null);
    const [selectedDate, setSelectedDate] = useState();

    const fetchGoals = async () => {
        const response = await api.get("/api/goals")
        setGoals(response.data)
    }

    const submitMilestone = async (data) => {
        try {
            const response = await api.post("/api/milestones", {
                title: data.title,
                goal_id: data.goal,
                deadline: selectedDate.toISOString().split("T")[0] // This code ensure that the backend db date format is YYYY-MM-DD
            })

            if (actionCompleted) {
                actionCompleted();
            }
            const newMilestone = await response.data
            setMilestones(milestones => [...milestones, newMilestone])
        } catch (error) {
            console.log(error.response?.data)
        } finally {
            reset();
            setShowCreateMilestone(false);
        }
    }

    useEffect(() => {
        fetchGoals();
    }, [])

  return (
    <div className='z-99 fixed inset-10 md:inset-10 xl:inset-25 container shadow-xl'>
        <div className='border-b border-gray-300 pb-3 flex justify-between items-center'>
            <h1 className='text-sm md:heading'>
                Create a New Milestone
            </h1>
            <button className='cursor-pointer' onClick={() => setShowCreateMilestone(false)}>
                <X size={40} />
            </button>
        </div>
        <div className='grid grid-cols-1 gap-y-12 md:grid-cols-2 mt-12'>
            <form className='space-y-12 md:space-y-3' onSubmit={handleSubmit(submitMilestone)}>
                    <div>
                        <label htmlFor="goal">
                            For which goal is this milestone?
                        </label>
                        <div>
                            <select id="goal" className='input-select' {...register("goal", { required: "You must select a goal" })}>
                                {
                                    goals?.map(goal => <option selected={presetGoal === goal.title} defaultValue={presetGoal === goal.title && goal.id} key={goal.id} value={goal.id}>{goal.title}</option>)
                                }
                            </select>
                                {
                                    goals?.length === 0 && <p className='paragraph text-yellow-600'>You don't have any goals yet. Create goals first to create a milestone.</p>
                                }
                        </div>
                    </div>
                    <div>
                        <label htmlFor="title">
                            What is the title of this milestone?
                        </label>
                        <input defaultValue={presetMilestone} id="title" type="text" className='md:input-lg input' placeholder='e.g. Write 10 articles on the Daily Prophet' {...register("title", { required: "You must enter a title for your milestone" })} />
                    </div>
                    <div>
                        <h3>What is the deadline for this milestone?</h3>
                        <DatePicker selected={selectedDate} setSelected={setSelectedDate} />
                    </div>
                    <input type="submit" className="button-lg" value="Create This Milestone" />
            </form>
            <div>
                <h4 className='heading'>TIP:</h4>
                <p className='paragraph'>
                    Milestones need to be in-between ambitious goals and practical actions. To put this into practice,
                    use numbers like, "Produce three episodes of a podcast by July." Think of it like what you'll likely 
                    achieve in a month.
                </p>
            </div>
        </div>
    </div>
  )
}

export default CreateNewGoal