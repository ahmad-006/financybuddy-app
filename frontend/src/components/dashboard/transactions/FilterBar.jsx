import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, ArrowUpDown } from "lucide-react";

export default function TransactionFilterBar({ filters, setFilters }) {
  const categories = [
    "Food",
    "Shopping",
    "Salary",
    "Utilities",
    "Entertainment",
    "Housing",
    "Transportation",
    "Dining Out",
    "Income",
  ];

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      category: "", // Added category to clear filters
      sortBy: "latest",
      minPrice: "",
      maxPrice: "",
      priceSort: "",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.type ||
    filters.category || // Added category to active filters check
    (filters.sortBy && filters.sortBy !== "latest") ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.priceSort;

  return (
    <div className="bg-white p-4 rounded-lg mb-4 border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          />
          <Input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Price Sort Filter */}
        <Select
          value={filters.priceSort || ""}
          onValueChange={(value) => setFilters({ ...filters, priceSort: value })}
        >
          <SelectTrigger className="w-full bg-gray-50 border-gray-300 text-gray-700">
            <div className="flex items-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by Price" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            <SelectItem value="price-desc">Most Expensive</SelectItem>
            <SelectItem value="price-asc">Least Expensive</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters({ ...filters, type: value })}
        >
          <SelectTrigger className="w-full bg-gray-50 border-gray-300 text-gray-700">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="w-full bg-gray-50 border-gray-300 text-gray-700">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select
          value={filters.sortBy || "latest"}
          onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
        >
          <SelectTrigger className="w-full bg-gray-50 border-gray-300 text-gray-700">
            <div className="flex items-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            <SelectItem value="latest">Latest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-10 px-3"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}