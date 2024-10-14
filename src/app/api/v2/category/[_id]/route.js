import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import CategoryDB from "@/lib/database/Model/categoryDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import UserDB from "@/lib/database/Model/userDB";

export async function GET(request, content) {
  await DBConnect();
  const { _id } = await content.params;
  console.log("L-10, authHeader--------->", _id);

  try {
    const category = await CategoryDB.findById(_id)
      .populate("products", "_id name")
      .lean(); // Use lean() for fast read

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        category,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

// Update a Category by ID - Requires Authentication
export async function PUT(request, content) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");
  console.log("L-45, authHeader--------->", authHeader);
  const { _id } = await content.params;

  if (!authHeader) {
    return NextResponse.json({ message: "No Token Found" }, { status: 401 });
  }

  try {
    let jwtVerification = jwtTokenVerification(authHeader);
    if (!jwtVerification.success) {
      return NextResponse.json(
        { message: "Token verification failed" },
        { status: 401 }
      );
    }

    let authorizedUser = await UserDB.exists({
      _id: jwtVerification?.decoded?.userId,
      token: authHeader.split(" ")[1],
      role: "admin",
    });

    if (!authorizedUser) {
      return NextResponse.json(
        { message: "You are not authorized to update categories" },
        { status: 403 }
      );
    }

    const data = await request.json();
    const updatedCategory = await CategoryDB.findByIdAndUpdate(_id, data, {
      new: true,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        category: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a Category by ID - Requires Authentication
export async function DELETE(request, { params }) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");
  const { _id } = params;

  if (!authHeader) {
    return NextResponse.json({ message: "No Token Found" }, { status: 401 });
  }

  try {
    let jwtVerification = jwtTokenVerification(authHeader);
    if (!jwtVerification.success) {
      return NextResponse.json(
        { message: "Token verification failed" },
        { status: 401 }
      );
    }

    let authorizedUser = await UserDB.exists({
      _id: jwtVerification?.decoded?.userId,
      token: authHeader.split(" ")[1],
      role: "admin",
    });

    if (!authorizedUser) {
      return NextResponse.json(
        { message: "You are not authorized to delete categories" },
        { status: 403 }
      );
    }

    const deletedCategory = await CategoryDB.findByIdAndDelete(_id);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        message: "Category deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
