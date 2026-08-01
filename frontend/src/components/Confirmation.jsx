import React from 'react'

const Confirmation = ({ message, confirm, onClose }) => {
    const handleConfirmation = () => {
        confirm();
        onClose();
    }
  return (
    <div className='shadow-xl border border-gray-300 rounded-xl fixed bg-white inset-10 md:inset-99 p-12 z-2 space-y-4'>
        <h2 className='text-md'>
            {message}
        </h2>
        <div className='space-x-2'>
        <button className='button-lg-blue' onClick={handleConfirmation}>
            Confirm
        </button>
        <button className='border border-gray-200 rounded-md shadow-sm px-13 py-2 cursor-pointer' onClick={onClose}>
            Cancel
        </button>
        </div>
    </div>
  )
}

export default Confirmation