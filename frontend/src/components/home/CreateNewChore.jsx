import { X } from 'lucide-react'
import NewChoreForm from '../forms/NewChoreForm'
const CreateNewChore = ({ actionCompleted, presetGoal, setShowCreateChore, setChores }) => {
  return (
    <div className='z-99 text-sm fixed inset-5 md:inset-15 xl:inset-30 container shadow-xl'>
        <div className='border-b border-gray-300 pb-3 flex justify-between items-center'>
            <h1 className='md:heading'>
                Create a New Chore
            </h1>
            <button className='cursor-pointer' onClick={() => setShowCreateChore(false)}>
                <X size={30} />
            </button>
        </div>
        <div className='mt-12 grid grid-cols-1 gap-y-13 md:grid-cols-2'>
            <NewChoreForm actionCompleted presetGoal={presetGoal} setChores={setChores} setShowCreateChore={setShowCreateChore} />
            <div>
                <h4 className='heading'>TIP:</h4>
                <p className='paragraph'>
                    Chores are daily short actions. They can be done within a span of an hour or two. Make them 
                    as practical as possible because these will contribute to your progress in milestones.
                </p>
            </div>
        </div>
    </div>
  )
}

export default CreateNewChore