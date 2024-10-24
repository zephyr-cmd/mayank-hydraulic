import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ProductDB from "@/lib/database/Model/productDB";
import UserDB from "@/lib/database/Model/userDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import CategoryDB from "@/lib/database/Model/categoryDB";
import ManufacturerDB from "@/lib/database/Model/manufacturerDB";

// Fetch the product details by ID, including category and manufacturer references
export async function GET(request, content) {
  try {
    // Connect to the database
    await DBConnect();

    // Extract product ID from the query parameters
    const { _id } = await content.params;
    const productId = _id;

    // Validate if productId is provided
    if (!productId) {
      return NextResponse.json(
        { status: 400, message: "Product ID is required." },
        { status: 400 }
      );
    }

    const product = await ProductDB.findById(productId)
      .populate("categoryId", "name description") // Include category details
      .populate("manufacturerId", "name country") // Include manufacturer details
      .lean()
      .exec();

    // Check if the product exists
    if (!product) {
      return NextResponse.json(
        { status: 404, message: "Product not found." },
        { status: 404 }
      );
    }

    // Return the product details
    return NextResponse.json({ status: 200, product }, { status: 200 });
  } catch (error) {
    console.error("L-42, Error fetching product details:", error);
    return NextResponse.json(
      { status: 500, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

// update any specific product using product _id
export async function PUT(request, { params }) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");
  const { productId } = params; // Get productId from route params

  if (!authHeader) {
    return NextResponse.json({ message: "No Token Found." }, { status: 401 });
  }

  try {
    const jwtVerification = jwtTokenVerification(authHeader);
    if (!jwtVerification.success) {
      return NextResponse.json(
        { message: "Token verification failed" },
        { status: 401 }
      );
    }

    const authorizedUser = await employeeDB.exists({
      _id: jwtVerification?.decoded?.userId,
      token: authHeader.split(" ")[1],
      role: "admin",
    });

    if (!authorizedUser) {
      return NextResponse.json(
        { message: "You are not authorized to access this Route" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate and format the specifications
    if (data.specifications) {
      if (!Array.isArray(data.specifications)) {
        return NextResponse.json(
          { message: "Specifications must be an array of objects." },
          { status: 400 }
        );
      }

      const isValidSpecs = data.specifications.every(
        (spec) => spec.key && spec.value
      );

      if (!isValidSpecs) {
        return NextResponse.json(
          {
            message: "Each specification must contain both 'key' and 'value'.",
          },
          { status: 400 }
        );
      }
    }

    const updatedProduct = await ProductDB.findByIdAndUpdate(
      productId,
      { $set: data },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("L-125, error:", error);
    return NextResponse.json(
      { status: 500, message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}

// delete specific product using product _id
export async function DELETE(request, { params }) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");
  const { _id } = params; // Extract productId from the route params

  if (!authHeader) {
    return NextResponse.json({ message: "No Token Found." }, { status: 401 });
  }

  try {
    const jwtVerification = jwtTokenVerification(authHeader);
    if (!jwtVerification.success) {
      return NextResponse.json(
        { message: "Token verification failed" },
        { status: 401 }
      );
    }

    const authorizedUser = await UserDB.exists({
      _id: jwtVerification?.decoded?.userId,
      token: authHeader.split(" ")[1],
      role: "admin",
    });

    if (!authorizedUser) {
      return NextResponse.json(
        { message: "You are not authorized to delete this product" },
        { status: 403 }
      );
    }

    const deletedProduct = await ProductDB.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("L-179, error:", error);
    return NextResponse.json(
      { status: 500, message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}
