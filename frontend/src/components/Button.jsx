import React from 'react'

const Button = ({ text, theme, action, icon }) => {
  return (
    <button
    onClick={action}
    className={`
      flex items-center gap-2
      ${theme === "hazard" ? "bg-red-500 text-white px-4 py-2 text-[12px] rounded-md cursor-pointer hover:opacity-90" : theme === "light" ? "border border-gray-100 shadow-sm text-black px-4 py-2 text-[12px] rounded-md cursor-pointer hover:opacity-90" : "button-sm"}
    `}
    >
        {text}
        {icon}
    </button>
  )
}

export default Button