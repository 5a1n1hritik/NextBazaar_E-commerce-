"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddProductPage = () => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    brand: string;
    price: string;
    discount: string;
    category: string;
    images: string[];
    stock: string;
    featured: boolean;
    rating: string;
    specifications: string;
    tags: string;
  }>({
    name: "",
    description: "",
    brand: "",
    price: "",
    discount: "",
    category: "",
    images: [],
    stock: "",
    featured: false,
    rating: "",
    specifications: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls: string[] = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
      );
      setFormData((prev) => ({ ...prev, images: imageUrls }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
        ...formData,
        price: Number(formData.price),
        featured: Boolean(formData.featured),
        stock: Number(formData.stock),
        rating: Number(formData.rating),
        discount: formData.discount ? Number(formData.discount) : 0, 
        specifications: formData.specifications.split("\n"), 
        tags: formData.tags.split(",").map(tag => tag.trim()), 
      };
    console.log("Sending Data:", formData);
    try {
      const response = await axios.post("/api/products", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(
        response.data.success
          ? "Product added successfully"
          : response.data.error
      );
      console.log("Response Data:", response.data);
      if (response.data.success) {
        setFormData({
          name: "",
          description: "",
          brand: "",
          price: "",
          discount: "",
          category: "",
          images: [],
          stock: "",
          featured: false,
          rating: "",
          specifications: "",
          tags: "",
        });
      }
    } catch (error: any) {
      console.error("Error adding product", error.response.data || error.message);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Product Brand</Label>
            <Textarea
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter product brand name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} value={formData.category}>
              <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="featured">Featured</Label>
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={() =>
                setFormData((prev) => ({ ...prev, featured: !prev.featured }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}
              placeholder="0-5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Textarea
              id="specifications"
              value={formData.specifications}
              onChange={handleChange}
              placeholder="Enter specifications"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma-separated tags"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit}>Add Product</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddProductPage;
