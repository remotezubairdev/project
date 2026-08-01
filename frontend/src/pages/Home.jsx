import React, { useEffect, useState } from 'react'
import { api } from './../api/api';
import { useAuth } from './../context/AuthContext';
import MainGoalsCard from '../components/home/MainGoalsCard';
import BarChart from '../components/charts/BarChart';
import { CalendarCard } from '../components/datepickers/CalendarCard';
import TodaysChores from '../components/home/TodaysChores';
import Milestones from '../components/home/Milestones';
import ProgressForm from '../components/forms/ProgressForm';

const Home = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [todaysRecord, setTodaysRecord] = useState(null);
  const [weekRecords, setWeekRecords] = useState(null);

  const fetchTodaysRecord = async () => {
    const response = await api.get("/api/day-record?today")
    setTodaysRecord(response.data[0])
  }

  const fetchWeekRecords = async () => {
    const response = await api.get("/api/day-record?week")
    setWeekRecords(response.data)
  }

  const createRecord = async (data) => {
    try {
      const response = await api.post("/api/day-record", {
        work: data.work,
        rest: data.rest,
        sleep: data.sleep
      })
      setTodaysRecord(response.data)
      fetchWeekRecords();
    } catch (error) {
      console.log(error?.response.data)
    }
  }

  useEffect(() => {
    fetchTodaysRecord();
    fetchWeekRecords();
  }, [])

  return (
    <section className='container'>
      <div className='flex justify-between flex-wrap items-start gap-16'>
          <div className='mx-auto max-w-xl space-y-12'>
            <div className='xl:mt-0 mt-32 flex xl:flex-row flex-col items-start justify-between'>
              <div className='space-y-3'>
                  <h1 className='text-2xl'>
                    Hello, {user.username}!
                  </h1>
                  {
                    todaysRecord ? (
                      <button className='button-sm'>Your progress for today has been recorded</button>
                    ) : (
                      <button className='button-sm' onClick={() => setShowForm(true)}>
                        Track Today's Progress
                      </button>
                    )
                  }
                  <p>
                    <span className='font-semibold'>Productivity Score:</span> {todaysRecord?.score}
                  </p>
                  {
                    showForm && (
                      <ProgressForm onSubmit={createRecord} onClose={() => setShowForm(false)} />
                    )
                  }
              </div>

              <div className='xl:text-end'>
                  <p>Hours Worked: {todaysRecord?.work} Hours</p>
                  <p>Hours Slept: {todaysRecord?.sleep} Hours</p>
                  <p>Hours Break: {todaysRecord?.rest} Hours</p>
              </div>
            </div>
            <BarChart weekRecords={weekRecords} />
        </div>
        <div className='mx-auto'>
            <CalendarCard />
        </div>
      </div>
      
      <div className='flex flex-wrap gap-8 items-center mt-12'>
        <MainGoalsCard />
        <TodaysChores />
      </div>
      <div>
        <Milestones />
      </div>
    </section>
  )
}

export default Home