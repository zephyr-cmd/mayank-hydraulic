import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import ProductDB from "@/lib/database/Model/productDB";

// to get popular* products from the products list
export async function GET() {
  await DBConnect();

  try {
    const popularProducts = await ProductDB.find({ isPopular: true })
      .select("_id name price images")
      .lean();

    if (!popularProducts.length) {
      return NextResponse.json(
        { message: "No popular products found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { status: 200, products: popularProducts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching popular products:", error);
    return NextResponse.json(
      { status: 500, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
