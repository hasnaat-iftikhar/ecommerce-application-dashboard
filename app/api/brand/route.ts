import { z } from "zod";

// Libs
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BrandFormValidator } from "@/lib/validators/brandForm";
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
      const { name } = BrandFormValidator.parse(body);

      const isBrandExists = await prisma.brand.findFirst({
        where: {
          name,
        },
      });

      if (isBrandExists) {
        return createErrorResponse("Brand already exists", 409);
      }

      await prisma.brand.create({
        data: {
          name,
        },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Brand created successfully!",
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Error while brand creation", err);
      return createErrorResponse("Brand creation failed", 422);
    }
  } catch (err) {
    if (err instanceof z.ZodError) return createErrorResponse(err.message, 500);
    return createErrorResponse("Server error", 500);
  }
}

export async function GET(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return createErrorResponse(
      "You are Unauthorized. Please login to your account",
      401
    );
  }

  const { searchParams } = new URL(req.url);
  const id = await searchParams.get("id");

  if (id) {
    const brand = await prisma.brand.findFirst({
      where: {
        id,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Brand fetched successfully!",
      data: brand,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    try {
      const brands = await prisma.brand.findMany({
        include: { products: true },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Brands fetched successfully!",
        data: brands,
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Unable to fetch brands", err);
      return createErrorResponse("Unable to fetch brands", 422);
    }
  }
}

export async function DELETE(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return createErrorResponse(
      "You are Unauthorized. Please login to your account",
      401
    );
  }

  const { searchParams } = new URL(req.url);
  const id = await searchParams.get("id");

  if (!id) {
    return createErrorResponse(
      "Please provide a valid ID in order to delete a brand",
      400
    );
  }

  try {
    const brandByID = await prisma.brand.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!brandByID || (brandByID.products && brandByID.products.length !== 0)) {
      return createErrorResponse("Brand has some attached products", 404);
    }

    await prisma.brand.delete({
      where: {
        id,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Brand deleted successfully!",
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("[server] Error 404", err);
    return createErrorResponse(
      "An error occurred while attempting to delete the brand",
      500
    );
  }
}

export async function PUT(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return createErrorResponse(
      "You are Unauthorized. Please login to your account",
      401
    );
  }

  const { searchParams } = new URL(req.url);
  const id = await searchParams.get("id");

  if (!id) {
    return createErrorResponse(
      "Please provide a valid ID in order to update a brand",
      400
    );
  }

  const body = await req.json();

  try {
    const { name } = BrandFormValidator.parse(body);

    const existingBrand = await prisma.brand.findUnique({
      where: {
        id,
      },
    });

    if (!existingBrand) {
      return createErrorResponse("Brand not found", 404);
    }

    const updatedBrand = await prisma.brand.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Brand updated successfully!",
      data: updatedBrand,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof z.ZodError) return createErrorResponse(err.message, 400);
    console.log("[server] Error while updating brand", err);
    return createErrorResponse(
      "An error occurred while updating the brand",
      500
    );
  }
}
