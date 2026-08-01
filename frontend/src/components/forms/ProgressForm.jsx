import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm, Watch } from 'react-hook-form'

const ProgressForm = ({ onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitRecord = (data) => {
        onSubmit(data);
        onClose();
    }
  return (
    <div className='fixed z-10 container inset-5 md:inset-70 shadow-xl'>
        <div className='border-b border-gray-300 pb-3 flex justify-between items-center'>
            <h1 className='md:heading'>
                Track today's progress
            </h1>
            <button className='cursor-pointer' onClick={onClose}>
                <X size={40} />
            </button>
        </div>
        <form onSubmit={handleSubmit(submitRecord)} className='space-y-2 mt-4'>
            <div>
                <h3>Hours Worked:</h3>
                <input type="number" min={0} defaultValue={0} max={24} className='input' {...register("work", {
                    required: true,
                })} />
            </div>
            <div>
                <h3>Hours Rested:</h3>
                <input type="number" min={0} defaultValue={0} max={24} className='input' {...register("rest", {
                    required: true,
                })} />
            </div>
            <div>
                <h3>Hours Slept:</h3>
                <input type="number" min={0} defaultValue={0} max={24} className='input' {...register("sleep", {
                    required: true,
                })} />
            </div>
            <input type='submit' value={"Track today"} className='button-lg' />
        </form>
    </div>
  )
}

export default ProgressForm