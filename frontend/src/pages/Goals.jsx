import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { Flag, Plus } from "lucide-react";
import Button from "../components/Button";
import GoalForm from "../components/forms/GoalForm";
const Goals = () => {
    const navigate = useNavigate();
    const [goals, setGoals] = useState(null);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [showCreateGoal, setShowCreateGoal] = useState(false);

    const fetchGoals = async () => {
        const response = await api.get("/api/goals");
        setGoals(response.data)
        const firstGoalId = await response.data[0]?.id
        if (firstGoalId) {
            setSelectedGoal(firstGoalId)
            navigate(`/goals/${firstGoalId}`)
        }
    }

    const createGoal = async (data) => {
        const response = await api.post('/api/goals', {
            title: data.title,
            priority: data.priority
        })
        setGoals(prev => [...prev, response.data])
        setSelectedGoal(response.data.id)
        navigate(`/goals/${response.data.id}`)
    }

    useEffect(() => {
        fetchGoals();
    }, [])

    if (goals?.length == 0) {
        return (
            <div className="container space-y-3">
                <div className="w-max p-6 border border-gray-200 shadow-sm rounded-2xl flex flex-col gap-3 items-center">
                    <Flag size={30} className="text-green-700" />
                    <h2>You don't have any goals yet.</h2>
                    <Button text={"Create a New Goal"} action={() => setShowCreateGoal(true)} />
                    {
                        showCreateGoal && (
                        <GoalForm 
                        heading={"Create a New Goal"}
                        onSubmit={createGoal}
                        onClose={() => setShowCreateGoal(false)}
                        />
                    )
                    }
                </div>
            </div>
        );
    }

  return (
    <div className='container'>
        <div className='flex'>
            <Button icon={<Plus />} action={() => setShowCreateGoal(true)} />
            {
                        showCreateGoal && (
                        <GoalForm 
                        heading={"Create a New Goal"}
                        onSubmit={createGoal}
                        onClose={() => setShowCreateGoal(false)}
                        />
                    )
                    }
            {
                goals?.map(goal => (
                <Link
                to={`/goals/${goal.id}`}
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`${goal.id === selectedGoal ? "bg-green-100" : ""} border-2 border-green-500 px-12 py-2 rounded-t-xl cursor-pointer`}
                >
                    {goal.title}
                </Link>
            ))
            }
        </div>
        <Outlet context={{fetchGoals}} />
    </div>
  )
}

export default Goals