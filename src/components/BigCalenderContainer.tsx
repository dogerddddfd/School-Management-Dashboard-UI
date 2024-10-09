"use client"

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import prisma from '@/lib/prisma';
import { title } from 'process';

const localizer = momentLocalizer(moment)

const BigCalendarContainer = async ({
   type,
   id,
}: {
   type: "teacherId" | "classId";
   id: string | number;
}) => {

   const dataRes = await prisma.lesson.findMany({
      where: {
         ...(type === 'teacherId'
            ? { teacherId: id as string }
            : { classId: id as number }
         )
      }
   })

   const data = dataRes.map(lesson => ({
      title: lesson.name,
      start: lesson.startTime,
      end: lesson.endTime,
   }))
   return (
      <div className="">
         <BigCalendar data={schedule} />
      </div>
   )

}

export default BigCalenderContainer