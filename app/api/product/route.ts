import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createErrorResponse } from "@/lib/utils";
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

    const body = await req.json();

    const { name, image, description, category, brand, price, tags } =
      ProductFormValidator.parse(body);

    const res = await prisma.product.create({
      data: {
        name,
        image: image || "",
        description,
        price,
        category: { connect: { id: category } },
        brand: { connect: { id: brand } },
        tags: {
          create: tags.map((tag) => ({
            tag: { connect: { id: tag } },
          })),
        },
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Product created successfully!",
    });
    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error while sending req: ", err);
    if (err instanceof z.ZodError)
      return new Response(err.message, {
        status: 422,
      });

    return new Response("Could not create product", { status: 500 });
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
    let productRes = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });
    const tagIDs = productRes?.tags.map((tag) => tag.tagId) || [];

    const tags = await prisma.tag.findMany({
      where: {
        id: {
          in: tagIDs,
        },
      },
    });

    const product = {
      id: productRes?.id,
      name: productRes?.name,
      image: productRes?.image,
      description: productRes?.description,
      price: productRes?.price,
      categoryId: productRes?.categoryId,
      brandId: productRes?.brandId,
      createdAt: productRes?.createdAt,
      updatedAt: productRes?.updatedAt,
      tagIDs,
      tags,
    };

    const successResponse = JSON.stringify({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    try {
      const products = await prisma.product.findMany();

      const successResponse = JSON.stringify({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Unable to fetch products", err);
      return createErrorResponse("Unable to fetch products", 422);
    }
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
      "Please provide a valid ID in order to update a product",
      400
    );
  }

  const body = await req.json();

  try {
    const { name, image, description, category, brand, price, tags } =
      ProductFormValidator.parse(body);

    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct) {
      return createErrorResponse("Product not found", 404);
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        image: image || "",
        description,
        price,
        category: { connect: { id: category } },
        brand: { connect: { id: brand } },
        tags: {
          create: tags.map((tag) => ({
            tag: { connect: { id: tag } },
          })),
        },
      },
    });

    console.log("updatedProduct", updatedProduct);

    const successResponse = JSON.stringify({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof z.ZodError) return createErrorResponse(err.message, 400);
    console.log("[server] Error while updating product", err);
    return createErrorResponse(
      "An error occurred while updating the product",
      500
    );
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
      "Please provide a valid ID in order to delete a product",
      400
    );
  }

  try {
    const productByID = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    if (!productByID) {
      return createErrorResponse(
        "There is an issue while product deletion.",
        404
      );
    }

    await prisma.tagsOnProducts.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.delete({
      where: {
        id,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Product deleted successfully!",
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("[server] Error 404", err);
    return createErrorResponse(
      "An error occurred while attempting to delete the product",
      500
    );
  }
}
