import { z } from "zod";

// Libs
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TagFormValidator } from "@/lib/validators/tagForm";
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
      const { name } = TagFormValidator.parse(body);

      const isTagExists = await prisma.tag.findFirst({
        where: {
          name,
        },
      });

      if (isTagExists) {
        return createErrorResponse("Tag already exists", 409);
      }

      await prisma.tag.create({
        data: {
          name,
        },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Tag created successfully!",
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Error while tag creation", err);
      return createErrorResponse("Tag creation failed", 422);
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
    const tag = await prisma.tag.findFirst({
      where: {
        id,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Tag fetched successfully!",
      data: tag,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    try {
      const tags = await prisma.tag.findMany({
        include: { products: true },
      });

      const successResponse = JSON.stringify({
        success: true,
        message: "Tags fetched successfully!",
        data: tags,
      });
      return new Response(successResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log("Unable to fetch tags", err);
      return createErrorResponse("Unable to fetch tags", 422);
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
      "Please provide a valid ID in order to delete a tag",
      400
    );
  }

  try {
    const tagByID = await prisma.tag.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!tagByID || (tagByID.products && tagByID.products.length !== 0)) {
      return createErrorResponse("Tag has some attached products", 404);
    }

    await prisma.tag.delete({
      where: {
        id,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Tag deleted successfully!",
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("[server] Error 404", err);
    return createErrorResponse(
      "An error occurred while attempting to delete the tag",
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
      "Please provide a valid ID in order to update a tag",
      400
    );
  }

  const body = await req.json();

  try {
    const { name } = TagFormValidator.parse(body);

    const existingTag = await prisma.tag.findUnique({
      where: {
        id,
      },
    });

    if (!existingTag) {
      return createErrorResponse("Tag not found", 404);
    }

    const updatedTag = await prisma.tag.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    const successResponse = JSON.stringify({
      success: true,
      message: "Tag updated successfully!",
      data: updatedTag,
    });

    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof z.ZodError) return createErrorResponse(err.message, 400);
    console.log("[server] Error while updating tag", err);
    return createErrorResponse("An error occurred while updating the tag", 500);
  }
}
