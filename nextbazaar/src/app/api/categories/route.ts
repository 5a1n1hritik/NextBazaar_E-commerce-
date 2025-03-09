import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          icon: 1,
          image: 1,
          productCount: { $size: "$products" },
        },
      },
    ]);

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, description, icon, image } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({ name, description, icon, image });

    return NextResponse.json(
      { success: true, category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, error: "Error creating category" },
      { status: 500 }
    );
  }
}
