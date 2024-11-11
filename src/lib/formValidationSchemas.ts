import * as z from 'zod';

export const teacherSchema = z.object({
   username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long!" })
      .max(20, { message: "Username must be at most 20 characters long!" }),
   email: z.string().email({ message: "Invalid email address!" }),
   password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }),
   firstName: z.string().min(1, { message: "First name is required!" }),
   lastName: z.string().min(1, { message: "Last name is required!" }),
   phone: z.string().min(1, { message: "Phone is required!" }),
   address: z.string().min(1, { message: "Address is required!" }),
   bloodType: z.string().min(1, { message: "Blood Type is required!" }),
   // birthday: z.date({ message: "Birthday is required!" }),
   sex: z.enum(["male", "female"], { message: "Sex is required!" }),
   // img: z.instanceof(File, { message: "Image is required" }),
});

export type TeacherSchema = z.infer<typeof teacherSchema>

export const studentSchema = teacherSchema

export type StudentSchema = z.infer<typeof studentSchema>



export const subjectSchema = z.object({
   id: z.coerce.number().optional(),
   name: z.string().min(1, { message: "Subject name is required!" }),
   teachers: z.array(z.string()), //teacher ids
 });

export type SubjectSchema = z.infer<typeof subjectSchema>;