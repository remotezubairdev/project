import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = ({ weekRecords }) => {

  // I used ChatGPT to figure out how to 
  // align the dates with the data being returned
  // Since, I'm not used to JS dates
  const labels = weekRecords?.map(record => 
    new Date(record.day).toLocaleDateString("en-US", {
      weekday: "short"
    })
  )
  const options = {};
  const data = {
      labels,
      datasets: [
          {
              label: 'Work',
              data: weekRecords?.map(record => record.work),
              backgroundColor: 'rgba(99, 255, 143, 0.5)',
              borderWidth: 1,
              borderColor: 'rgba(99, 255, 143, 1)'
          },
          {
              label: 'Breaks',
              data: weekRecords?.map(record => record.rest),
              backgroundColor: 'rgba(252, 255, 99, 0.5)',
              borderWidth: 1,
              borderColor: 'rgba(252, 255, 99, 1)'
          },
          {
              label: 'Sleep',
              data: weekRecords?.map(record => record.sleep),
              backgroundColor: 'rgba(99, 203, 255, 0.5)',
              borderWidth: 1,
              borderColor: 'rgba(99, 203, 255, 1)'
          },
      ]
  }
  return (
    <div className='xl:w-xl w-[300px]'>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart