import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { ClassSchema, classSchema } from '@/lib/formValidationSchemas';
import { createClass, updateClass } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ClassForm = ({
   type,
   data,
   setOpen,
   relatedData
}: {
   type: "create" | "update";
   data?: any,
   setOpen: Dispatch<SetStateAction<boolean>>,
   relatedData?: any
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ClassSchema>({
      resolver: zodResolver(classSchema),
   });

   const [state, formAction] = useFormState(
      type === "create" ? createClass : updateClass,
      {
         success: false,
         error: false,
      }
   );
   

   const onSubmit = handleSubmit(data => {
      console.log(data)
      formAction(data)
   })
   
   const router = useRouter()


   useEffect(() => {
      if (state.success) {
         toast(`Class has been ${type}d`)
         setOpen(false)
         router.refresh()
      }
   }, [state])

   const { teachers, grades } = relatedData;

   return (
      <form className='flex flex-col gap-8' onSubmit={onSubmit}>
         <h1 className='text-1 font-semibold'>
            {type === "create" && "Create a new class"}
            {type === "update" && "Update class info"}
         </h1>
         <div className="flex justify-between flex-wrap gap-4">
            {data && (
               <InputField
                  label="Id"
                  name="id"
                  defaultValue={data?.id}
                  register={register}
                  error={errors?.id}
                  hidden
               />
            )}
            <InputField
               label="Class name"
               name="name"
               defaultValue={data?.name}
               register={register}
               error={errors?.name}
            />
            <InputField
               label="Capacity"
               name="capacity"
               defaultValue={data?.capacity}
               register={register}
               error={errors?.capacity}
            />
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
               <label className='text-sm text-gray-500'>Grade</label>
               <select
                  className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                  {...register("gradeId")}
                  defaultValue={data?.gradeId}
               >
                  {grades.map(
                     (grades: { id: number, level: number}) => (
                        <option value={grades.id} key={grades.id}>
                           {grades.level}
                        </option>
                     ))}
               </select>
               {errors.gradeId?.message &&
                  <p className='text-xs text-red-400 '>
                     {errors.gradeId.message.toString()}
                  </p>
               }
            </div>
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
               <label className='text-sm text-gray-500'>Supervisor</label>
               <select
                  className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                  {...register("supervisorId")}
                  defaultValue={data?.supervisorId}
               >
                  {teachers.map(
                     (teacher: { id: string, name: string; surname: string }) => (
                        <option value={teacher.id} key={teacher.id}>
                           {teacher.name + " " + teacher.surname}
                        </option>
                     ))}
               </select>
               {errors.supervisorId?.message &&
                  <p className='text-xs text-red-400 '>
                     {errors.supervisorId.message.toString()}
                  </p>
               }
            </div>
         </div>
         {state.error && <span className='text-red-500'>some thing wrong!</span>}
         <button className='bg-blue-400 text-white p-2 rounded-md'>
            {type === "create" ? "Create" : "Update"}
         </button>
      </form>
   )
}

export default ClassForm