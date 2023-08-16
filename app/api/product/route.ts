import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProductFormValidator } from "@/lib/validators/productForm";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const body = req.json();
    const { name, image, description, category, brand, price, tags } =
      ProductFormValidator.parse(body);

    await prisma.product.create({
      data: {
        name,
        image,
        description,
        category,
        brand,
        price,
        tags,
      },
    });

    return new Response("Product created successfully!");
  } catch (err) {
    if (err instanceof z.ZodError)
      return new Response(err.message, {
        status: 422,
      });

    return new Response("Could not create product", { status: 500 });
  }
}
