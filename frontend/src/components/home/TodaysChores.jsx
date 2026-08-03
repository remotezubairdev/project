import { useEffect, useState } from "react"
import { Check, Plus, X } from "lucide-react"
import CreateNewChore from "./CreateNewChore"
import { api } from "../../api/api";
import ChoresTable from "./ChoresTable";
const TodaysChores = () => {
    const [showCreateChore, setShowCreateChore] = useState(false);
    const [chores, setChores] = useState(null);

    const today = new Date()

    const fetchChores = async () => {
        try {
            const response = await api.get("/api/chores")
            setChores(response.data)
        } catch (error) {
            console.log(error?.response.data)
        }
    }

    useEffect(() => {
        fetchChores();
    }, [])
  return (
    <div className="w-full">
        <div className='flex justify-between items-center border border-green-300 bg-green-200 p-3 rounded-lg mb-3'>
            <p>Create a new chore</p>
            <button onClick={() => setShowCreateChore(true)} className='button-sm flex justify-between items-center'>
                <Plus size={20} />
            </button>
            {
                showCreateChore && (
                    <CreateNewChore setShowCreateChore={setShowCreateChore} setChores={setChores} />
                )
            }
        </div>
        <ChoresTable fetchChores={fetchChores} chores={chores} />
    </div>
  )
}

export default TodaysChores