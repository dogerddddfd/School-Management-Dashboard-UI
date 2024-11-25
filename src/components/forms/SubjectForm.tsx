import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas';
import { createSubject, updateSubject } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SubjectForm = ({
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
   } = useForm<SubjectSchema>({
      resolver: zodResolver(subjectSchema),
   });

   const [state, formAction] = useFormState(
      type === "create" ? createSubject : updateSubject,
      {
         success: false,
         error: false,
      }
   );

   const [selectedTeachers, setSelectedTeachers] = useState<string[]>(data?.teachers || []);

   const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const options = event.target.options;
      const value: string[] = [];
      for (let i = 0; i < options.length; i++) {
         if (options[i].selected) {
            value.push(options[i].value);
         }
      }
      console.log(value);
      setSelectedTeachers(value);
   };

   const onSubmit = handleSubmit(data => {
      let t = selectedTeachers
      console.log(t[0])
      if (typeof selectedTeachers[0] === 'object') {
         t = []
         selectedTeachers.forEach(teacher => {
            // @ts-ignore
            if (teacher.id) {
               // @ts-ignore
               t.push(teacher.id)
            }
         })
      }

      const submitData: {
         name: string,
         id?: number,
         teachers: string[]
      } = {
         ...data,
         teachers: t, // 将选中的教师传递到提交的数据中
      };
      console.log(selectedTeachers)
      console.log(submitData)
      formAction(submitData)
   })

   const router = useRouter()


   useEffect(() => {
      if (state.success) {
         toast(`Subject has been ${type}d`)
         setOpen(false)
         router.refresh()
      }
   }, [state])

   const { teachers } = relatedData;

   return (
      <form className='flex flex-col gap-8' onSubmit={onSubmit}>
         <h1 className='text-1 font-semibold'>
            {type === "create" && "Create a new subject"}
            {type === "update" && "Update subject info"}
         </h1>
         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="Subject name"
               name="name"
               defaultValue={data?.name}
               register={register}
               error={errors?.name}
            />
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
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
               <label className='text-sm text-gray-500'>Teachers</label>
               <select
                  className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                  multiple
                  {...register("teachers")}
                  value={selectedTeachers} // 绑定状态
                  onChange={onSelectChange} // 处理选择变化
               >
                  {teachers.map(
                     (teacher: { id: string, name: string; surname: string }) => (
                        <option value={teacher.id} key={teacher.id}>
                           {teacher.name + " " + teacher.surname}
                        </option>
                     ))}
               </select>
               {errors.teachers?.message &&
                  <p className='text-xs text-red-400 '>
                     {errors.teachers.message.toString()}
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

export default SubjectForm