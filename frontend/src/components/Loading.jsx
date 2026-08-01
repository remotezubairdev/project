import React from 'react'
import { LoaderCircle } from 'lucide-react';

const Loading = ({ message }) => {
  return (
    <section className='container flex items-center justify-between'>
        {message}
        <LoaderCircle className='animate-spin' />
    </section>
  )
}

export default Loading