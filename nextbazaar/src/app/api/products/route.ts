import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      description,
      brand,
      price,
      discount,
      category,
      images,
      stock,
      featured,
      rating,
      specifications,
      tags
    } = await req.json();

    if (!name || !description || !brand  || !price || !category || !stock || !specifications) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const categoryDoc = await Category.findOne({
      name: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (!categoryDoc) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 400 }
      );
    }

    const finalPrice = discount ? price - (price * discount) / 100 : price;

    const newProduct = await Product.create({
      name,
      description,
      brand,
      price,
      discount,
      finalPrice,
      category: categoryDoc._id,
      images,
      stock,
      featured,
      rating,
      specifications,
      tags
    });

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).populate("category", "name");

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
