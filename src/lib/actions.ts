"use server"

import { revalidatePath } from "next/cache"
import { SubjectSchema, TeacherSchema } from "./formValidationSchemas"
import { ClassSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = { success: boolean, error: boolean }

// #region Subject Actions
export const createSubject = async (
   currentState: CurrentState,
   data: SubjectSchema
) => {
   try {
      await prisma.subject.create({
         data: {
            name: data.name,
            teachers: {
               connect: data.teachers.map(teacherId => ({ id: teacherId }))
            }
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const updateSubject = async (
   currentState: CurrentState,
   data: SubjectSchema
) => {
   try {
      console.log(data)
      await prisma.subject.update({
         where: {
            id: data.id
         },
         data: {
            name: data.name,
            teachers: {
               set: data.teachers.map(teacherId => ({ id: teacherId }))
            }
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const deleteSubject = async (
   currentState: CurrentState,
   data: FormData
) => {
   const id = data.get("id") as string
   try {
      console.log(data)
      await prisma.subject.delete({
         where: {
            id: parseInt(id)
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}
// #endregion

// #region Class Actions
export const createClass = async (
   currentState: CurrentState,
   data: ClassSchema
) => {
   try {
      await prisma.class.create({
         data: {
            name: data.name,
            capacity: data.capacity,
            gradeId: data.gradeId,
            supervisorId: data.supervisorId,
         }
      })
      // revalidatePath("/list/class")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const updateClass = async (
   currentState: CurrentState,
   data: ClassSchema
) => {
   try {
      console.log(data)
      await prisma.class.update({
         where: {
            id: data.id
         },
         data: {
            name: data.name,
            capacity: data.capacity,
            gradeId: data.gradeId,
            supervisorId: data.supervisorId,
         }
      })
      // revalidatePath("/list/class")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const deleteClass = async (
   currentState: CurrentState,
   data: FormData
) => {
   const id = data.get("id") as string
   try {
      console.log(data)
      await prisma.class.delete({
         where: {
            id: parseInt(id)
         }
      })
      // revalidatePath("/list/class")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}
// #endregion

// #region Teacher Actions
export const createTeacher = async (
   currentState: CurrentState,
   data: TeacherSchema
) => {
   try {
      await prisma.teacher.create({
         data: {
            name: data.name,
            teachers: {
               connect: data.teachers.map(teacherId => ({ id: teacherId }))
            }
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const updateTeacher = async (
   currentState: CurrentState,
   data: TeacherSchema
) => {
   try {
      console.log(data)
      await prisma.teacher.update({
         where: {
            id: data.id
         },
         data: {
            name: data.name,
            teachers: {
               set: data.teachers.map(teacherId => ({ id: teacherId }))
            }
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}

export const deleteTeacher = async (
   currentState: CurrentState,
   data: FormData
) => {
   const id = data.get("id") as string
   try {
      console.log(data)
      await prisma.teacher.delete({
         where: {
            id: parseInt(id)
         }
      })
      // revalidatePath("/list/subject")
      return { success: true, error: false }
   } catch (err) {
      console.log(err)
      return { success: false, error: true }
   }
}
// #endregion