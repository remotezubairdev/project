import { Milestone, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProgressBar from '../ProgressBar'
import fetchMilestones from '../../utils/fetchMilestones'
import CreateNewMilestone from './CreateNewMilestone'
import MilestoneTable from './MilestoneTable'

const Milestones = () => {
    const [milestones, setMilestones] = useState(null)
    const [showCreateMilestone, setShowCreateMilestone] = useState(false);
    const grabMilestones = async () => {
        const data = await fetchMilestones();
        console.log(data)
        setMilestones(data);
    }
    useEffect(() => {
        grabMilestones();
    }, [])
  return (
    <div className='w-full py-12'>
        <div className='flex justify-between items-center border border-yellow-300 bg-yellow-200 p-3 rounded-lg mb-3'>
            <p>Create a new milestone</p>
            <button onClick={() => setShowCreateMilestone(prev => !prev)} className='button-sm-yellow flex justify-between items-center'>
                <Plus size={20} />
            </button>
            {
                showCreateMilestone && <CreateNewMilestone setShowCreateMilestone={setShowCreateMilestone} setMilestones={setMilestones} />
            }
        </div>
        <div className='overflow-x-auto w-full'>
            <MilestoneTable fetchMilestones={grabMilestones} milestones={milestones} />
        </div>
    </div>
  )
}

export default Milestones