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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TitleCard } from "./title-card";
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
import { TitleDialog } from "@/components/title-dialog";
import { EditCard } from "@/components/edit-card";
import { DeleteCard } from "@/components/delete-card";

export type Title = {
  id: number;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
  video: string;
  support: string;
  poster: string;
};

const initialData: Title[] = [
  {
    id: 1,
    amount: 316,
    status: "pending",
    title: "project ikan keli",
    video: "video.com",
    support: "support.com",
    poster: "poster.com",
  },
  {
    id: 2,
    amount: 242,
    status: "pending",
    title: "Maybank Virtual bank",
    video: "video.com",
    support: "support.com",
    poster: "poster.com",
  },
  {
    id: 3,
    amount: 837,
    status: "processing",
    title: "Monserrat44@gmail.com",
    video: "video.com",
    support: "support.com",
    poster: "poster.com",
  },
  {
    id: 4,
    amount: 874,
    status: "success",
    title: "Silas22@gmail.com",
    video: "video.com",
    support: "support.com",
    poster: "poster.com",
  },
  {
    id: 5,
    amount: 721,
    status: "failed",
    title: "carmella@hotmail.com",
    video: "video.com",
    support: "support.com",
    poster: "poster.com",
  },
];

function TitleTable() {
  const [data, setData] = React.useState<Title[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedTitle, setSelectedTitle] = React.useState("");
  const [selectedVideo, setSelectedVideo] = React.useState("");
  const [selectedSupport, setSelectedSupport] = React.useState("");
  const [selectedPoster, setSelectedPoster] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleTitleUpdate = (updatedTitle: Title ) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedTitle.id ? updatedTitle : item
      )
    );
  };

  const handleTitleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const columns: ColumnDef<Title>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const { title, video, support, poster } = row.original;
        return (
          <div
            className="lowercase cursor-pointer hover:underline"
            onClick={() => {
              setSelectedTitle(title);
              setSelectedVideo(video);
              setSelectedSupport(support);
              setSelectedPoster(poster);
              setIsDialogOpen(true);
            }}
          >
            {title}
          </div>
        );
      },
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
      cell: ({ row }) => {
        const title = row.original;
        return (
          <div className="flex justify-end space-x-2">
            <EditCard title={title} onEdit={handleTitleUpdate} />
            <DeleteCard onDelete={() => handleTitleDelete(title.id)} />
          </div>
        );
      },
    },
  ];

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
          <Link href="/leaderboard">
            <Button className="mr-5 text-black bg-white border-2 hover:bg-gray-200">
              Leaderboard
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Create <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col justify-center items-center ">
              <Link href="/create-user" className=" ">
                <Button className="bg-white text-black hover:text-white px-[2rem] ">
                  User
                </Button>
              </Link>

              <TitleCard></TitleCard>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
      <TitleDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={selectedTitle}
        video={selectedVideo}
        support={selectedSupport}
        poster={selectedPoster}
      />
    </div>
  );
}

export default TitleTable;
