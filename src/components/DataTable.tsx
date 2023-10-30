"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, ClipboardList, FileDown, Filter, MoreHorizontal, MoveUpRight} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Order} from "@prisma/client";
import {useContext, useEffect} from "react";
import {findOrdersByUserId} from "@/app/server/order";
import {UserContext} from "@/app/dashboard/userContext";
import Link from "next/link";

// const data: Data[] = [
//     {
//         id: "m5gr834i9",
//         article: "Article 1",
//         equipment: "Equipment 1",
//         production_date: "01/01/2021",
//         warranty_period: "01/01/2021",
//         serial_number: "123456789",
//     }
// ]
export type Data = Pick<Order, "article" | "equipment" | "production_date" | "warranty_period" | "serial_number" | "id">

export const columns: ColumnDef<Data>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "serial_number",
        header: () => <div className="text-center">Серийный номер</div>,
        cell: ({row}) => (
            <div className="capitalize text-center">{row.getValue("serial_number")}</div>
        ),
    },
    {
        accessorKey: "article",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className={"text-center"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Артикул
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="text-center">{row.getValue("article")}</div>,
    },
    {
        accessorKey: "equipment",
        cell: ({row}) => <div className="text-center">{row.getValue("equipment")}</div>,
        header: () => <div className="text-center">Комплектация</div>,
    },
    {
        accessorKey: "production_date",
        cell: ({row}) => <div className="text-center">{row.getValue("production_date")}</div>,
        header: () => <div className="text-center">Дата производства</div>,
    },
    {
        accessorKey: "warranty_period",
        cell: ({row}) => <div className="text-center">{row.getValue("warranty_period")}</div>,
        header: () => <div className="text-center">Срок гарантийного обслуживания</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const data = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(data.serial_number)}
                            className={"flex flex-row gap-4 items-center"}
                        >
                            <ClipboardList size={20}/>
                            Скопировать сер. номер
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href={"/../orders/" + data.id + "/"} className={"flex flex-row gap-4 items-center"}>
                                <MoveUpRight size={20}/>
                                Открыть паспорт
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={"flex flex-row gap-4 items-center"}>
                            <Link href={"/../api/order/" + data.id + "/?download=true"}
                                  className={"flex flex-row gap-4 items-center"}>
                                <FileDown size={20}/>
                                Скачать паспорт
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function DataTable(props: { data: Data[] }) {
    let data = useContext(UserContext);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: data || [],
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
    })
    const data_values = {
        article: "Артикул",
        equipment: "Комплектация",
        production_date: "Дата производства",
        warranty_period: "Дата гарантийного обслуживания",
        serial_number: "Серийный номер",
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder="Введите серийный номер..."
                    value={(table.getColumn("serial_number")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("serial_number")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto flex gap-4 items-center">
                            <Filter size={20}/> Поля <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column, i) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {data_values[column.id as keyof typeof data_values]}

                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
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
                                    )
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
                                    Нет результатов.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} из {" "}
                    {table.getFilteredRowModel().rows.length} записей выделено.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Вперед
                    </Button>
                </div>
            </div>
        </div>
    )
}
