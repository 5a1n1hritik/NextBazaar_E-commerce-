import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Product ID" },
        { status: 400 }
      );
    }

    const productId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, error: "Invalid Product ID format" },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Product ID" },
        { status: 400 }
      );
    }

    const productId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      name,
      description,
      price,
      discount,
      category,
      images,
      stock,
      featured,
    } = body;

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 400 }
      );
    }

    let product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const finalPrice = discount ? price - (price * discount) / 100 : price;

    product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        discount,
        finalPrice,
        category: categoryDoc._id,
        images,
        stock,
        featured,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Product ID" },
        { status: 400 }
      );
    }

    const productId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
