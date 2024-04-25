import * as z from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const baseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  feature: z.boolean().optional(),
  author: z.string().min(1, { message: "Author is required" }),
  isbn: z
    .string()
    .regex(/^(978|979)/u, "The ISBN format is invalid")
    .min(13, { message: "ISBN minimum length is 13" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export const addBookSchema = z
  .object({
    mode: z.literal("add"),
    cover_image: z
      .instanceof(File)
      .refine((file) => file.name !== "", "Cover image is required")
      .refine(
        (file) => file.size <= MAX_UPLOAD_SIZE,
        `Max image size is ${MAX_MB}MB`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      ),
  })
  .merge(baseSchema);

export const editBookSchema = z
  .object({
    mode: z.literal("edit"),
    cover_image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.name !== "", "Cover image is required")
      .refine(
        (file) => !file || file.size <= MAX_UPLOAD_SIZE,
        `Max image size is ${MAX_MB}MB`
      )
      .refine(
        (file) =>
          !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      ),
  })
  .merge(baseSchema);

export const bookSchema = z.discriminatedUnion("mode", [
  addBookSchema,
  editBookSchema,
]);

export type BookSchema = z.infer<typeof bookSchema>;

export interface IBook {
  id: number;
  title: string;
  featured: boolean;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover_image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IBorrowed {
  id: number;
  borrowed_date: string;
  due_date: string;
  return_date: string | null;
  book: {
    id: number;
    title: string;
    cover_image: string;
  };
  user: {
    id: number;
    full_name: string;
  };
}
