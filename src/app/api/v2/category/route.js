import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import CategoryDB from "@/lib/database/Model/categoryDB";
import UserDB from "@/lib/database/Model/userDB";
import { jwtTokenVerification } from "@/components/helper/utils";

export async function POST(request) {
  await DBConnect();
  const authHeader = await request?.headers?.get("authorization");
  console.log("L-11, authHeader--------->", authHeader);

  if (!authHeader) {
    return NextResponse.json(
      {
        message: "No Token Found.",
      },
      { status: 401 }
    );
  }

  try {
    let jwtVerificaiton = jwtTokenVerification(authHeader);
    if (!jwtVerificaiton.success) {
      return NextResponse.json(
        {
          message: "Token verification failed",
        },
        { status: 401 }
      );
    }

    let authorizedUser = await UserDB.exists({
      _id: jwtVerificaiton?.decoded?.userId,
      token: authHeader.split(" ")[1],
      role: "admin",
    });

    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }

    const data = await request.json();
    const newCategory = await CategoryDB.create(data);

    return NextResponse.json(
      {
        status: 201,
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("L-57, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}

// to fetch all the categories
// export async function GET() {
//   try {
//     // Connect to the database
//     await DBConnect();

//     // Aggregate categories with their products' names and IDs
//     const categories = await CategoryDB.aggregate([
//       {
//         $lookup: {
//           from: "products", // MongoDB collection name for products
//           localField: "_id",
//           foreignField: "categoryId",
//           as: "products",
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           name: 1,
//           description: 1,
//           "products._id": 1,
//           "products.name": 1,
//         },
//       },
//     ]);

//     // Return the categories with their products in the response
//     return NextResponse.json(
//       {
//         status: 200,
//         categories,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching categories with products:", error);
//     return NextResponse.json(
//       {
//         status: 500,
//         message: "Something Went Wrong",
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  await DBConnect();

  try {
    const [DocumentLength, categories] = await Promise.all([
      CategoryDB.countDocuments(),
      CategoryDB.find().populate("products", "_id name").lean(),
    ]);

    return NextResponse.json(
      {
        status: 200,
        DocumentLength,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
