import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ClientDB from "@/lib/database/Model/clientDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import userDB from "@/lib/database/Model/userDB";

// create free-consultation user
export async function POST(request) {
  try {
    await DBConnect(); // Connect to the database

    const data = await request.json(); // Parse JSON request body
    // console.log("L-15, inside free-consultation", data);

    // Validate the input fields (if they are provided)
    if (data.CountryCode && !/^\+\d{1,3}$/.test(data.CountryCode)) {
      return NextResponse.json(
        { message: "Invalid Country Code. It should be in format +91." },
        { status: 400 }
      );
    }

    if (data.phoneNumber && !/^\d{10,13}$/.test(data.phoneNumber.toString())) {
      return NextResponse.json(
        { message: "Phone number must be between 10 to 13 digits." },
        { status: 400 }
      );
    }

    if (data.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }
    // Create the new Client Request with the valid data
    const newEntity = await ClientDB.create({
      name: data.name || "",
      countryCode: data.countryCode,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
      description: data?.description,
      requestRaiseFrom: data?.requestRaiseFrom,
      saleLead: true,
    });

    // Respond with the created entity
    return NextResponse.json(
      {
        status: 201,
        message: "Request raised successfully",
        entity: newEntity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating entity:", error);
    return NextResponse.json(
      { status: 500, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
export async function GET(request) {
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

    let authorizedUser = await userDB.exists({
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

    // const data = await request.json();
    const clientData = await ClientDB.find({})
      .sort({ createdAt: -1 })
      .limit(15)
      .select("countryCode name email phoneNumber requestRaiseFrom description")
      .lean();

    return NextResponse.json(
      {
        status: 200,
        clientData: clientData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("L-114, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
