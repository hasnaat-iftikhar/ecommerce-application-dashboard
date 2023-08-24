// Libs
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createErrorResponse } from "@/lib/utils";

export async function GET(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return createErrorResponse(
      "You are Unauthorized. Please login to your account",
      401
    );
  }

  try {
    const users = await prisma.user.findMany();

    const successResponse = JSON.stringify({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
    return new Response(successResponse, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("Unable to fetch users", err);
    return createErrorResponse("Unable to fetch users", 422);
  }
}
