import * as z from "zod";

export const productZod = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  category: z.enum(["Electronics", "Books", "Clothing", "Home Goods", "Toys"]),
  price: z.coerce.number().positive("Price must be a positive number."),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer."),
  status: z.enum(["In Stock", "Out of Stock", "Discontinued"]),
});
