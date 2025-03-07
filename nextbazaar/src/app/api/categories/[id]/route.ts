import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Category from "@/models/Category";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: { id?: string } }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Category ID" },
        { status: 400 }
      );
    }

    const productId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const category = await Category.findById(productId);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching category" },
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
        { success: false, error: "Missing Category ID" },
        { status: 400 }
      );
    }
    const categoryId = id.trim();
    const { name, icon, image } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, icon, image },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, category: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { success: false, error: "Error updating category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Category ID" },
        { status: 400 }
      );
    }

    const categoryId = id.trim();

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { success: false, error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { success: false, error: "Error deleting category" },
      { status: 500 }
    );
  }
}
