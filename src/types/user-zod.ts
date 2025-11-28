import z from "zod";

export const userZod = z.object({
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(6, "minimum 6 characters required"),
});
