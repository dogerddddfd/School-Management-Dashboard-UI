import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { subjectSchema, SubjectSchema } from '@/lib/formValidationSchemas';
import { createSubject, updateSubject } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SubjectForm = ({
   type, data, setOpen
}: {
   type: "create" | "update";
   data?: any,
   setOpen: Dispatch<SetStateAction<boolean>>
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

   const onSubmit = handleSubmit(data => {
      console.log(data)
      formAction(data)
   })

   const router = useRouter()


   useEffect(() => {
      if (state.success) {
         toast(`Subject has been ${type}d`)
         setOpen(false)
         router.refresh()
      }
   }, [state])

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
         </div>
         {state.error && <span className='text-red-500'>some thing wrong!</span>}
         <button className='bg-blue-400 text-white p-2 rounded-md'>
            {type === "create" ? "Create" : "Update"}
         </button>
      </form>
   )
}

export default SubjectForm