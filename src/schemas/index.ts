import { UserRole } from "@prisma/client";
import * as z from "zod";

// Login schema
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

// Register schema
export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

// Reset password schema
export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

// New password schema
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

// Settings schema
export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(1, {
        message: "Name is required",
      })
    ),
    email: z.optional(
      z.string().email({
        message: "Email is required",
      })
    ),
    password: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required",
      })
    ),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
