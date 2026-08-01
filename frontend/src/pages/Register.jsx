import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitRegister = (data) => {
    setLoading(true);
    axios.post("http://127.0.0.1:8000/api/register", {
      username: data.username,
      email: data.email,
      password: data.password
    })
    .then(response => {
      const data = response.data;
      console.log(data)
      setLoading(false);
      navigate("/login")
    })
    .catch(error => {
      if (error.status == 400) {
        setError("Username already taken.")
      }
      console.error(error)
      setLoading(false);
    })
    reset();
  }

  return (
    <section className='container'>
        <h1 className='heading'>
            Register
        </h1>
        {
          error && (
            <p className='text-red-500'>
              {error}
            </p>
          )
        }
        <form
          onSubmit={handleSubmit(submitRegister)} 
          className='max-w-lg space-y-2 mt-6'
        >
          <div className='flex flex-col'>
            <label htmlFor="username">
              Username
            </label>
              {
                errors.username ? <p className='text-red-500'>{errors.username.message}</p> : ''
              }
            <input 
            type="text" 
            className='input'
            id='username'
            {...register("username", {
              required: "You must enter a username"
            })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email">
              Email
            </label>
              {
                errors.email ? <p className='text-red-500'>{errors.email.message}</p> : ''
              }
            <input 
            type="email" 
            className='input'
            id='email'
            {...register("email", {
              required: "You must enter an email"
            })}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">
              Password
            </label>
              {
                errors.password ? <p className='text-red-500'>{errors.password.message}</p> : ''
              }
            <input 
            type="password" 
            className='input'
            id='password'
            {...register("password", {
              required: "You must enter a password",
              minLength: {
                value: 4,
                message: "Password must be 4 characters or more"
              },
              maxLength: {
                value: 12,
                message: "Password cannot be greater than 12 characters"
              }
            })}
            />
          </div>
          <div className='flex items-center gap-6'>
            <input type="submit" value={"Register"} className='button-lg'  />
            {
              loading && <LoaderCircle className='animate-spin' />
            }
          </div>
        </form>

        <p className='mt-3'>Already have an account? <Link to={"/login"} className='underline'>Login</Link></p>
    </section>
  )
}

export default Register