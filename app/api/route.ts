import { getAuthSession } from "@/lib/auth";
import { ProductFormValidator } from "@/lib/validators/productForm";

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
  } catch (err) {}
}
