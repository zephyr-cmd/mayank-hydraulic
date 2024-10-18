import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ManufacturerDB from "@/lib/database/Model/manufacturerDB";
import ProductDB from "@/lib/database/Model/productDB";
import { jwtTokenVerification } from "@/components/helper/utils";
import employeeDB from "@/lib/database/Model/employeeDB";

// fetch one Manufacturer API
export async function GET(request, { params }) {
  await DBConnect();

  try {
    const { _id } = params;
    const manufacturer = await ManufacturerDB.findById(_id)
      .populate("products", "_id name price") // Populate product details
      .lean()
      .exec();

    if (!manufacturer) {
      return NextResponse.json(
        { message: "Manufacturer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200, manufacturer }, { status: 200 });
  } catch (error) {
    console.error("Error fetching manufacturer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Update Manufacturer API (Along with Products Array)
export async function PUT(request, { params }) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");

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

    const { _id } = params;
    const data = await request.json();

    const manufacturer = await ManufacturerDB.findByIdAndUpdate(
      _id,
      { $set: data, $addToSet: { products: { $each: data.products || [] } } }, // Add new products if provided
      { new: true, runValidators: true }
    ).exec();

    if (!manufacturer) {
      return NextResponse.json(
        { message: "Manufacturer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 200, manufacturer }, { status: 200 });
  } catch (error) {
    console.error("Error updating manufacturer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

//  Delete Manufacturer API
export async function DELETE(request, { params }) {
  await DBConnect();
  const authHeader = request?.headers?.get("authorization");

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

    const { _id } = params;

    const manufacturer = await ManufacturerDB.findByIdAndDelete(_id).exec();

    if (!manufacturer) {
      return NextResponse.json(
        { message: "Manufacturer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Manufacturer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting manufacturer:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
