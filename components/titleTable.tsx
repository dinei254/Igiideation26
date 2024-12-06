"use client";

import * as React from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Link } from "react-router-dom";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: 1,
    amount: 316,
    status: "success",
    title: "ken99@yahoo.com",
  },
  {
    id: 2,
    amount: 242,
    status: "success",
    title: "Abe45@gmail.com",
  },
  {
    id: 3,
    amount: 837,
    status: "processing",
    title: "Monserrat44@gmail.com",
  },
  {
    id: 4,
    amount: 874,
    status: "success",
    title: "Silas22@gmail.com",
  },
  {
    id: 5,
    amount: 721,
    status: "failed",
    title: "carmella@hotmail.com",
  },
  {
    id: 6,
    amount: 721,
    status: "failed",
    title: "carmella@hotmail.com",
  },
];

export type Payment = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
};

const editRow = (row: any) => {
  console.log("Button 1 clicked for row:", row.original);
};

const deleteRow = (row: any) => {
  console.log("Button 2 clicked for row:", row.original);
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => (
      <div className="flex justify-end space-x-2">
        <Button
          
          size="sm"
          onClick={() => editRow(row)}
        >
          Edit
        </Button>
        <Button
          
          size="sm"
          onClick={() => deleteRow(row)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

function TitleTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-[45rem] ">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-row">
          <Button className="mr-5 text-black bg-white border-2 hover:bg-gray-200">
            Leaderboard
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Create <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <Link href="/createUser" className=" ">
                <Button className="bg-white text-black hover:text-white px-12">
                  User
                </Button>
              </Link>

              <Button className="bg-white text-black hover:text-white">
                Title
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TitleTable;
