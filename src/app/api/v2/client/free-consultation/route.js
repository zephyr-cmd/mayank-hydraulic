import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ClientDB from "@/lib/database/Model/clientDB";

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
