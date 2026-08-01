import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    <div className='border w-[100px] h-[10px] overflow-hidden rounded-full border-gray-300'>
        <div style={{ height: '100%', backgroundColor: 'orange', width: progress }}></div>
    </div>
  )
}

export default ProgressBar