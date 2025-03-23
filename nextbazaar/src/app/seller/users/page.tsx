"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  ArrowUpDown,
  Eye,
  Edit,
  UserPlus,
  Shield,
  User,
  UserX,
  Check,
  X,
} from "lucide-react";

import { users } from "@/components/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const UsersPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      // Apply search filter
      if (
        searchTerm &&
        !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Apply role filter
      if (
        roleFilter !== "all" &&
        user.role.toLowerCase() !== roleFilter.toLowerCase()
      ) {
        return false;
      }

      // Apply tab filter
      if (activeTab === "customers" && user.role !== "Customer") {
        return false;
      } else if (activeTab === "admins" && user.role !== "Admin") {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const dateA = new Date(a.joined).getTime();
      const dateB = new Date(b.joined).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === "orders-high") {
        return b.orders - a.orders;
      } else if (sortOrder === "orders-low") {
        return a.orders - b.orders;
      }

      return 0;
    });

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const indexOfLastUsers = currentPage * UsersPerPage;
  const indexOfFirstUsers = indexOfLastUsers - UsersPerPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirstUsers,
    indexOfLastUsers
  );

  const totalPages = Math.ceil(filteredUsers.length / UsersPerPage);

  // Get role badge styling
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return {
          color:
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
          icon: <Shield className="h-3.5 w-3.5 mr-1" />,
        };
      case "customer":
        return {
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          icon: <User className="h-3.5 w-3.5 mr-1" />,
        };
      default:
        return {
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
          icon: null,
        };
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your customers and administrators
          </p>
        </div>

        {/* Tabs for quick filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            <Button className="hidden md:flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </Tabs>

        {/* Desktop Search and Filter Controls */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
                <SelectItem value="orders-high">Orders: High to Low</SelectItem>
                <SelectItem value="orders-low">Orders: Low to High</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Download className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search and Filter Controls */}
        <div className="md:hidden space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => {
                setSortOrder((prev) =>
                  prev === "newest" ? "name-asc" : "newest"
                );
              }}
            >
              <ArrowUpDown className="h-4 w-4" />
              {sortOrder === "newest"
                ? "Newest"
                : sortOrder === "name-asc"
                ? "Name A-Z"
                : "Sort"}
            </Button>
            <Button variant="outline" size="icon">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>

          {isFilterOpen && (
            <div className="p-4 border rounded-lg space-y-4 bg-background shadow-sm">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Role</h3>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sort By</h3>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                    <SelectItem value="orders-high">
                      Orders: High to Low
                    </SelectItem>
                    <SelectItem value="orders-low">
                      Orders: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRoleFilter("all");
                    setSortOrder("newest");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role);
                  return (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${getInitials(
                                user.name
                              )}`}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground hidden group-hover:block">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge.color}`}
                        >
                          {roleBadge.icon}
                          {user.role}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{user.joined}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.orders > 0 ? "secondary" : "outline"}
                        >
                          {user.orders}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.orders > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.orders > 0 ? (
                            <Check className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <X className="h-3.5 w-3.5 mr-1" />
                          )}
                          {user.orders > 0 ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit user
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => {
              const roleBadge = getRoleBadge(user.role);
              return (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 flex justify-between items-center border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${getInitials(
                              user.name
                            )}`}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge.color}`}
                      >
                        {roleBadge.icon}
                        {user.role}
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium flex items-center mt-1">
                          <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                          {user.joined}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Orders</p>
                        <div className="font-medium mt-1">
                          <Badge
                            variant={user.orders > 0 ? "secondary" : "outline"}
                            className="mt-1"
                          >
                            {user.orders}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mt-1 ${
                            user.orders > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.orders > 0 ? (
                            <Check className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <X className="h-3.5 w-3.5 mr-1" />
                          )}
                          {user.orders > 0 ? "Active" : "Inactive"}
                        </div>
                      </div>
                      <div className="flex items-end justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <MoreHorizontal className="h-4 w-4 mr-1" />
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit user
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No users found.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{currentUsers.length}</strong> of{" "}
            <strong>{users.length}</strong> users
          </div>
          <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            className="hidden sm:flex"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                className={
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
        </div>
      </div>
    </>
  );
}
