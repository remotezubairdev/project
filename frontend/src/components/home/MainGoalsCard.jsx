import { useState, useEffect } from 'react'
import { api } from '../../api/api'
import { Plus } from 'lucide-react'
import CreateNewGoal from './CreateNewGoal'

const MainGoalsCard = () => {
  const [goals, setGoals] = useState(null)
  const [showCreateGoal, setShowCreateGoal] = useState(false)


    const fetchGoals = async () => {
        const response = await api.get("/api/goals")
        setGoals(response.data)
    }
    useEffect(() => {
        fetchGoals()
    }, [])

  return (
    <section className='w-2xl'>
        <div className='flex justify-between items-center border border-blue-300 bg-blue-200 p-3 gap-x-4 rounded-lg mb-3'>
            <p>Create a new main goal</p>
            <button onClick={() => setShowCreateGoal(true)} className='button-sm-blue flex justify-between items-center'>
                <Plus size={20} />
            </button>
            {
                showCreateGoal && (
                    <CreateNewGoal setGoals={setGoals} setShowCreateGoal={setShowCreateGoal} />
                )
            }
        </div>
        <div className='max-h-90 overflow-y-scroll overflow-x-auto w-full'>
        <table className='w-full text-left'>
            <thead>
                <tr className='bg-blue-400'>
                    <th className='text-white font-normal p-3 rounded-tl-lg'>Main Goals</th>
                    <th className='text-white font-normal p-3 rounded-tr-lg'>Priority</th>
                </tr>
            </thead>
            <tbody>
                {
                    goals?.map((goal, index) => (
                        <tr className={`border border-gray-200`} key={goal.id}>
                            <td className='border-r border-gray-200 p-3'>{goal.title}</td>
                            <td className='p-3'>{goal.priority === "H" ? "High 🔴" : goal.priority === "M" ? "Medium 🟡" : "Low 🟢"}</td>
                        </tr>
                    ))
                }
                {
                    goals?.length === 0 && (
                        <tr className={`border border-gray-200`}>
                            <td className='border-r border-gray-200 p-3'>No goals yet.</td>
                            <td className='p-3'>---</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    </section>
  )
}

export default MainGoalsCard