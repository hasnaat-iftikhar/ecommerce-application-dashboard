import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CategoryFormValidator } from "@/lib/validators/categoryForm";
import { z } from "zod";

export async function POST(req: Request) {
  console.log("h");
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json();

    console.log(body, "body");

    try {
      const { name } = CategoryFormValidator.parse(body);

      const isCategoryExists = await prisma.category.findFirst({
        where: {
          name,
        },
      });

      if (isCategoryExists) {
        console.log("Category already exists");
        return new Response("Category already exists", { status: 409 });
      }

      await prisma.category.create({
        data: {
          name,
        },
      });

      return new Response("Product created successfully!");
    } catch (err) {
      console.log("Err", err);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError)
      return new Response(err.message, {
        status: 422,
      });

    return new Response("Could not create category", { status: 500 });
  }
}
