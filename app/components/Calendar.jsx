import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Calendar({onDateSelect}) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDates, setSelectedDates] = useState(null)
  const[date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const startDate = date[0].startDate.toLocaleDateString();
  const endDate = date[0].endDate.toLocaleDateString();

  const currentDate = new Date().toDateString();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate()+1);
  const formattedDate = nextDate.toDateString()

  const handleSelectedDates = async () => {
    const bookingDates = {startDate, endDate}
    setSelectedDates(`${startDate} - ${endDate}`)
    setShowCalendar(false)  

    if(onDateSelect) {
      onDateSelect(bookingDates)
    }
  }
  return (
    <div className='container py-4 px-4 mx-auto'>
      <div className='flex justify-center gap-3 items-baseline '>
        <div className='border-1 border-blue-500 px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white' onClick={()=>{setShowCalendar(!showCalendar)}} >
        {
          !selectedDates && (
            <div className='text-xs md:text-xl'>{`${currentDate} - ${formattedDate}`}</div>
          )
        }
        {
          selectedDates && (
            <div className='bg-green-400 w-full h-full p-2 rounded-md'>Selected Dates: {selectedDates}</div>
          )
        }
      </div>
      
      <div>
        <button className='h-full text-xs md:text-xl bg-blue-500 px-2 py-1 rounded-sm text-white mt-5 hover:bg-blue-600' onClick={handleSelectedDates}>Select Dates</button>
      </div>
      </div>
      <div className='flex justify-center mt-5'>
        {
          showCalendar && (
            <DateRange 
          editableDateInputs={true}
          onChange={item => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
        />
          )
        }
      </div>
    </div>
  )
}
