"use client";

import * as React from "react";
import Link from "next/link";

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
import { AdminCard } from "./admin-card";

const data: Leaderboard[] = [
  {
    userRank: 1,
    mark: 316,
    position: "Admin",
    User: "ken99@yahoo.com",
  },
  {
    userRank: 2,
    mark: 242,
    position: "Admin",
    User: "Abe45@gmail.com",
  },
  {
    userRank: 3,
    mark: 837,
    position: "Judge",
    User: "Monserrat44@gmail.com",
  },
  {
    userRank: 4,
    mark: 874,
    position: "Judge",
    User: "Silas22@gmail.com",
  },
  {
    userRank: 5,
    mark: 721,
    position: "Judge",
    User: "carmella@hotmail.com",
  },
  {
    userRank: 6,
    mark: 721,
    position: "Judge",
    User: "carmella@hotmail.com",
  },
];

export type Leaderboard = {
  userRank: number;
  mark: number;
  position: "Judge" | "Admin";
  User: string;
};

export const columns: ColumnDef<Leaderboard>[] = [
  {
    accessorKey: "userRank",
    header: "Rank",
    cell: ({ row }) => <div>{row.getValue("userRank")}</div>,
  },
  {
    accessorKey: "User",
    header: "User",
    cell: ({ row }) => <div className="lowercase">{row.getValue("User")}</div>,
  },
  {
    accessorKey: "mark",
    header: "Mark",
    cell: ({ row }) => <div className="capitalize">{row.getValue("mark")}</div>,
  },
];

function LeaderboardTable() {
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

export default LeaderboardTable;
