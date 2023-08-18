import { z } from "zod";

// Libs
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CategoryFormValidator } from "@/lib/validators/categoryForm";
import { createErrorResponse } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return createErrorResponse(
        "You are Unauthorized. Please login to your account",
        401
      );
    }

    const body = await req.json();

    try {
      const { name } = CategoryFormValidator.parse(body);

      const isCategoryExists = await prisma.category.findFirst({
        where: {
          name,
        },
      });

      if (isCategoryExists) {
        return createErrorResponse("Category already exists", 409);
      }

      await prisma.category.create({
        data: {
          name,
        },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Category created successfully!",
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Error while category creation", err);
      return createErrorResponse("Category creation failed", 422);
    }
  } catch (err) {
    if (err instanceof z.ZodError) return createErrorResponse(err.message, 500);
    return createErrorResponse("Server error", 500);
  }
}

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return createErrorResponse(
        "You are Unauthorized. Please login to your account",
        401
      );
    }

    try {
      const categories = await prisma.category.findMany({
        include: { products: true },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Categories fetched successfully!",
        data: categories,
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Unable to fetch categories", err);
      return createErrorResponse("Unable to fetch categories", 422);
    }
  } catch (err) {
    return createErrorResponse("Server error", 500);
  }
}
