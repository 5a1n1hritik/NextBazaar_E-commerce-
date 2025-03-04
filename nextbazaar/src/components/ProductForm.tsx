"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ImagePlus, Save, Package } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  price: z.preprocess((val) => (val ? Number(val) : 0), z.number()),
  category: z.string().min(1, { message: "Please select a category." }),
  offerPrice: z.preprocess(
    (val) => (val ? Number(val) : 0),
    z.number().optional()
  ),
  inStock: z.boolean(),
  countInStock: z.preprocess((val) => (val ? Number(val) : 0), z.number()),
  image: z.array(z.string()).default([]),
  rating: z.number().optional(),
  numReviews: z.number().optional(),
});

interface ProductFormProps {
  initialData?: z.infer<typeof formSchema>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel?: () => void;
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [imagePreview, setImagePreview] = useState<string[]>(
    initialData?.image || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      category: "",
      offerPrice: 0,
      inStock: true,
      countInStock: 0,
      image: [],
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview([...imagePreview, ...newImages]);
      form.setValue("image", [...imagePreview, ...newImages]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-background to-muted/20">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                Product Management
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Add or update product information in your inventory
              </CardDescription>
            </div>
            <Package className="h-8 w-8 text-primary opacity-80" />
          </div>
        </CardHeader>
        <Tabs
          defaultValue="details"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6 pt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="inventory">Inventory & Media</TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => onSubmit(values))}
                className="space-y-6"
              >
                <TabsContent value="details" className="space-y-6 mt-0">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter product name"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="home">
                                Home & Garden
                              </SelectItem>
                              <SelectItem value="toys">Toys & Games</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            {...field}
                            className="min-h-32 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                className="pl-8 h-11"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="offerPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>offerPrice (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter SKU"
                              {...field}
                              className="h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="inventory" className="mt-0">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          Inventory Information
                        </h3>
                        <Separator />
                      </div>
                      <FormField
                        control={form.control}
                        name="inStock"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                In Stock
                              </FormLabel>
                              <FormDescription>
                                Set whether this product is currently available
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="countInStock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                {...field}
                                className="h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Product Media</h3>
                        <Separator />
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 w-full aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={triggerFileInput}
                        >
                          {imagePreview.length > 0 ? (
                            imagePreview.map((img, index) => (
                              <Image
                                key={index}
                                src={
                                  img ||
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
                                }
                                alt="Product preview"
                                className="max-h-full max-w-full object-contain rounded-md"
                                width={800}
                                height={800}
                              />
                            ))
                          ) : (
                            <>
                              <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground text-center">
                                Click to upload product image
                                <br />
                                <span className="text-xs">
                                  PNG, JPG or GIF (max. 5MB)
                                </span>
                              </p>
                            </>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            multiple
                            hidden
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <div className="pt-4">
                  <Separator />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Product
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
