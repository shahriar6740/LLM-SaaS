import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { UploadedFile } from "@/models/UploadedFile";
import FileActions from "@/components/FileTable/FileActions";
import { formattedFileSize } from "@/lib/utils";
import { BsFiletypePdf, BsFiletypeTxt } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";

type FileTableColumnsProps = {
	onDelete: (fileId: number) => Promise<void>;
	onView: (fileId: number) => Promise<void>;
}

export const getFileTableColumns = (props: FileTableColumnsProps): ColumnDef<UploadedFile>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "fileName",
		header: "File Name",
		cell: ({ row }) => <span className="flex items-center gap-x-3">
			{row.original.fileType === "application/pdf" ? <BsFiletypePdf size={26} /> : <BsFiletypeTxt />}
			{row.original.fileName}
		</span>
	},
	{
		accessorKey: "size",
		header: "Size",
		cell: ({ row }) => formattedFileSize(row.original.size)
	},
	{
		accessorKey: "dateUploaded",
		header: "Uploaded At",
		// cell: ({row}) => row.original.dateUploaded.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})
		cell: ({ row }) => formatDistanceToNow(row.original.dateUploaded, { addSuffix: true })
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <FileActions data={row.original} onView={props.onView} onDelete={props.onDelete} />
	}
];