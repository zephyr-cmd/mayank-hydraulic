import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ProductDB from "@/lib/database/Model/productDB";
import UserDB from "@/lib/database/Model/userDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import ManufacturerDB from "@/lib/database/Model/manufacturerDB";
import CategoryDB from "@/lib/database/Model/categoryDB";

// create the product
export async function POST(request) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");

  console.log("L-14, authHeader--------->", authHeader);

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
        { message: "You are not authorized to access this Route" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate and format the specifications
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
        { message: "Each specification must contain both 'key' and 'value'." },
        { status: 400 }
      );
    }

    // Step 1: Create the Product
    const newProduct = await ProductDB.create(data);

    // Step 2: Update the Manufacturer's product list
    await ManufacturerDB.findByIdAndUpdate(
      data.manufacturerId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    // Step 3: Update the Category's product list
    await CategoryDB.findByIdAndUpdate(
      data.categoryId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    return NextResponse.json(
      { status: 201, product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("L-84, error:", error);
    return NextResponse.json(
      { status: 500, message: "Something Went Wrong" },
      { status: 500 }
    );
  }
}

// fetch the products using pagination
export async function GET(request) {
  try {
    await DBConnect();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit")) || 10, 50); // Limit with max 50
    const cursor = searchParams.get("cursor"); // Cursor for pagination
    const direction = searchParams.get("direction") || "next"; // 'next' or 'prev'

    // Create query based on cursor and direction
    let query = {};
    if (cursor) {
      const [createdAt, _id] = cursor.split("_"); // Split the cursor
      const date = new Date(createdAt); // Convert to Date object

      // Handling both next and previous directions
      query =
        direction === "next"
          ? {
              $or: [
                { createdAt: { $gt: date } },
                { createdAt: date, _id: { $gt: _id } },
              ],
            }
          : {
              $or: [
                { createdAt: { $lt: date } },
                { createdAt: date, _id: { $lt: _id } },
              ],
            };
    }

    // Execute both queries using Promise.all for efficiency
    const [totalDocs, products] = await Promise.all([
      ProductDB.countDocuments(), // Total document count
      ProductDB.find(query)
        .sort({ createdAt: direction === "next" ? 1 : -1, _id: 1 })
        .limit(limit + 1)
        .select("name manufacturerId categoryId price images")
        .populate("manufacturerId", "name ")
        .populate("categoryId", "name")
        .lean()
        .exec(),
    ]);

    const hasNextPage = products.length > limit;
    if (hasNextPage) products.pop(); // Remove the extra item if present

    // Determine next and previous cursors only if applicable
    const nextCursor = hasNextPage
      ? `${products[products.length - 1].createdAt.toISOString()}_${
          products[products.length - 1]._id
        }`
      : null;

    const prevCursor =
      cursor && products.length > 0 // Only set prevCursor if it's not the first page
        ? `${products[0].createdAt.toISOString()}_${products[0]._id}`
        : null;

    // Return the paginated results along with cursors
    return NextResponse.json({
      totalDocs,
      nextCursor,
      prevCursor,
      hasNextPage,
      products,
    });
  } catch (error) {
    console.error("L-168, Error fetching products:", error);
    return NextResponse.json(
      { status: 500, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
