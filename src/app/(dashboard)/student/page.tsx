import Announcements from "@/components/Announcements"
import AttendanceChar from "@/components/AttendanceChart"
import BigCalendar from "@/components/BigCalender"
import CountChart from "@/components/CountChart"
import EventCalender from "@/components/EventCalender"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

const StudentPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
    {/* left */}
    <div className="w-full lg:w-2/3">
      <div className='h-full bg-white p-4 rounded-md'>
        <h1 className="text-xl font-semibold">Schedule(4A)</h1>
        <BigCalendar/>
      </div>
    </div>
    {/* right */}
    <div className="w-full lg:w-1/3 flex flex-col gap-8">
      <EventCalender/>
      <Announcements/>
    </div>
  </div>
  )
}

export default StudentPage