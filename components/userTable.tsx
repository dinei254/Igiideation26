"use client";

import * as React from "react";
import Link from "next/link";
import { AdminCard } from "./adminCard";

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
import { JudgeCard } from "./judgeCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: User[] = [
  {
    id: 1,
    position: "Admin",
    User: "ken99@yahoo.com",
  },
  {
    id: 2,
    position: "Admin",
    User: "Abe45@gmail.com",
  },
  {
    id: 3,
    position: "Judge",
    User: "Monserrat44@gmail.com",
  },
  {
    id: 4,
    position: "Judge",
    User: "Silas22@gmail.com",
  },
  {
    id: 5,
    position: "Judge",
    User: "carmella@hotmail.com",
  },
  {
    id: 6,
    position: "Judge",
    User: "carmella@hotmail.com",
  },
];

export type User = {
  id: number;

  position: "Judge" | "Admin";
  User: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "User",
    header: "User",
    cell: ({ row }) => <div className="lowercase">{row.getValue("User")}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
];

function UserTable() {
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
          placeholder="Filter User..."
          value={(table.getColumn("User")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("User")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-row">
          <div className="mr-5">
            <AdminCard></AdminCard>
          </div>
          <div>
            <JudgeCard></JudgeCard>
          </div>
        </div>
      </div>
      {/* the table */}
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

export default UserTable;
