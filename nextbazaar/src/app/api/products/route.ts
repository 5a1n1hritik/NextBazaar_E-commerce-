import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Received body:", body);

    let {
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

    if (!Array.isArray(image)) {
      image = typeof image === "string" ? [image] : [];
    }
    if (!Array.isArray(category)) {
      category = typeof category === "string" ? [category] : [];
    }

    if (
      !name ||
      !price ||
      !description ||
      image.length === 0 ||
      !countInStock || category.length === 0 ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const newproduct = new Product({
      name,
      price,
      description,
      // image: Array.isArray(image) ? image : [image], 
      // category: Array.isArray(category) ? category : [category], 
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
    console.error("Product Creation Error:", error);  // Log full error
    return NextResponse.json({
        success: false,
        message: "Failed to create product",
        error: error.message,
        stack: error.stack // Include stack trace
    }, { status: 500 });
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
