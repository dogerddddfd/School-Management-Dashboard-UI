import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import Image from 'next/image';
import { teacherSchema, TeacherSchema } from '@/lib/formValidationSchemas';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createTeacher, updateTeacher } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';


const TeacherForm = ({
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
   } = useForm<TeacherSchema>({
      resolver: zodResolver(teacherSchema),
   });

   const [state, formAction] = useFormState(
      type === "create" ? createTeacher : updateTeacher,
      {
         success: false,
         error: false,
      }
   );

   const [img, setImg] = useState<any>()


   const [selectedSubjects, setSelectedSubjects] = useState<string[]>(data?.subjects || []);

   const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const options = event.target.options;
      const value: string[] = [];
      for (let i = 0; i < options.length; i++) {
         if (options[i].selected) {
            value.push(options[i].value);
         }
      }
      console.log(value);
      setSelectedSubjects(value);
   };

   const onSubmit = handleSubmit(data => {
      let t = selectedSubjects
      console.log(t[0])
      if (typeof selectedSubjects[0] === 'object') {
         t = []
         selectedSubjects.forEach(subject => {
            // @ts-ignore
            if (subject.id) {
               // @ts-ignore
               t.push(subject.id)
            }
         })
      }

      const submitData: TeacherSchema = {
         ...data,
         subjects: t, // 将选中的教师传递到提交的数据中
      };
      console.log(selectedSubjects)
      console.log(submitData)
      formAction(submitData)
   })

   const router = useRouter()


   useEffect(() => {
      if (state.success) {
         toast(`Class has been ${type}d`)
         setOpen(false)
         router.refresh()
      }
   }, [state])

   const { subjects } = relatedData

   return (
      <form className='flex flex-col gap-8' onSubmit={onSubmit}>
         <h1 className='text-1 font-semibold'>
            {type === "create" && "Create a new teacher"}
            {type === "update" && "Update teacher info"}
         </h1>
         <span className='text-xs text-gray-400 font-medium'>
            Authentication Information
         </span>
         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="name"
               name="name"
               defaultValue={data?.name}
               register={register}
               error={errors?.name}
            />
            <InputField
               label="surname"
               name="surname"
               defaultValue={data?.surname}
               register={register}
               error={errors?.surname}
            />
            <InputField
               label="Email"
               name="email"
               defaultValue={data?.email}
               register={register}
               error={errors?.email}
            />
            <InputField
               label="Password"
               name="password"
               type="password"
               defaultValue={data?.password}
               register={register}
               error={errors?.password}
            />
         </div>
         <span className='text-xs text-gray-400 font-medium'>
            Personal Information
         </span>
         <div className="flex justify-between flex-wrap gap-4">
            <InputField
               label="First Name"
               name="firstName"
               defaultValue={data?.firstName}
               register={register}
               error={errors.firstName}
            />
            <InputField
               label="Last Name"
               name="lastName"
               defaultValue={data?.lastName}
               register={register}
               error={errors.lastName}
            />
            <InputField
               label="Phone"
               name="phone"
               defaultValue={data?.phone}
               register={register}
               error={errors.phone}
            />
            <InputField
               label="Address"
               name="address"
               defaultValue={data?.address}
               register={register}
               error={errors.address}
            />
            <InputField
               label="Blood Type"
               name="bloodType"
               defaultValue={data?.bloodType}
               register={register}
               error={errors.bloodType}
            />
            <InputField
               label="Birthday"
               name="birthday"
               defaultValue={data?.birthday}
               register={register}
               error={errors.birthday}
               type="date"
            />
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
               <label className='text-sm text-gray-500'>Gender</label>
               <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                  {...register("sex")}
                  defaultValue={data?.sex}
               >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
               </select>
               {errors.sex?.message &&
                  <p className='text-xs text-red-400 '>
                     {errors.sex.message.toString()}
                  </p>
               }
            </div>
            <div className='flex flex-col gap-2 w-full md:w-1/4'>
               <label className='text-sm text-gray-500'>Subject</label>
               <select className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                  multiple
                  {...register("subjects")}
                  value={selectedSubjects} // 绑定状态
                  onChange={onSelectChange} // 处理选择变化
               >
                  {subjects.map(
                     (subject: { id: string, name: string; surname: string }) => (
                        <option value={subject.id} key={subject.id}>
                           {subject.name}
                        </option>
                     ))}
               </select>
               {errors.subjects?.message &&
                  <p className='text-xs text-red-400 '>
                     {errors.subjects.message.toString()}
                  </p>
               }
            </div>
            {/* <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
               <label
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                  htmlFor="img"
               >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>Upload a photo</span>
               </label>
               <input type="file" id="img" {...register("img")}  />
               {errors.img?.message && (
                  <p className="text-xs text-red-400">
                     {errors.img.message.toString()}
                  </p>
               )}
            </div> */}

            <CldUploadWidget uploadPreset="school" onSuccess={(result, { widget }) => {
               setImg(result.info)
               widget.close()
            }}>
               {({ open }) => {
                  return (
                     <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
                        <label
                           className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                           onClick={() => open()}
                           htmlFor="img"
                        >
                           <Image src="/upload.png" alt="" width={28} height={28} />
                           <span>Upload a photo</span>
                        </label>
                     </div>

                  );
               }}
            </CldUploadWidget>
         </div>

         <button className='bg-blue-400 text-white p-2 rounded-md'>
            {type === "create" ? "Create" : "Update"}
         </button>
      </form>
   )
}

export default TeacherForm