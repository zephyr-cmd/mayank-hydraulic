import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ManufacturerDB from "@/lib/database/Model/manufacturerDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import UserDB from "@/lib/database/Model/userDB";

export async function POST(request) {
  await DBConnect();
  const authHeader = await request?.headers?.get("authorization");

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
    const newManufacturer = await ManufacturerDB.create(data);

    return NextResponse.json(
      {
        status: 201,
        manufacturer: newManufacturer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("L-144, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}

// to get all manufacturer from the manufacturer collection
export async function GET() {
  await DBConnect();

  try {
    const manufacturers = await ManufacturerDB.find()
      .populate("products", "_id name") // Populate product ID and name
      .lean()
      .exec();

    return NextResponse.json(
      {
        status: 200,
        manufacturers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
