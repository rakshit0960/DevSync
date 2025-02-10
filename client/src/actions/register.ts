"use server"

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerUser = async (formData: z.infer<typeof signupSchema>) => {
  const validatedFields = await signupSchema.safeParseAsync(formData);


  if (!validatedFields.success) {
    return { error: `Invalid fields ${validatedFields.error.message}` };
  }

  try {
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);


    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return { success: "User created successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unexpected error type');
    }
    return { error: "Something went wrong" };
  }
}
