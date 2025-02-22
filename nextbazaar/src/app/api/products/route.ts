import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      price,
      description,
      image,
      category,
      rating,
      offerPrice,
      numReviews,
      countInStock,
    } = body;

    if (
      !name ||
      !price ||
      !description ||
      !image ||
      countInStock || category === undefined
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const newproduct = new Product({
      name,
      price,
      description,
      image,
      category,
      offerPrice,
      rating: rating || 0,
      numReviews: numReviews || 0,
      countInStock,
    });
    await newproduct.save();

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        newproduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({});

    return NextResponse.json({ success: true, products }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
        error,
      },
      { status: 500 }
    );
  }
}
