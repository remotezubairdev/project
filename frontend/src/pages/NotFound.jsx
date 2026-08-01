import { CircleX } from 'lucide-react'
const NotFound = () => {
  return (
    <section className='container'>
      <h1 className='heading flex items-center gap-3'>
        <CircleX className='text-red-700' />
        Page Not Found
      </h1>
      <p className='mt-3'>
        The page you're looking for could not be found.
      </p>
    </section>
  )
}

export default NotFound