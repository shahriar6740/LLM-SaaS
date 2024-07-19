import { UploadedFile as UploadedFileModel } from "@/models/UploadedFile";
import { DataTable } from "@/components/ui/data-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFileTableColumns } from "@/components/FileTable/FileTableColumns";
import { toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FileInput, FileUploader } from "@/components/ui/file-uploader";
import { useAppContext } from "@/context/AppContext";

const FileTable = () => {
	const { appLoading, setAppLoading } = useAppContext();
	const [temporaryFiles, setTemporaryFiles] = useState<File[]>([]);
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([]);

	const onFileUpload = useCallback(async () => {
		try {
			setAppLoading(true);
			const files = await Promise.resolve(temporaryFiles);
			setUploadedFiles(prev => prev.concat(files.map((file, index) => ({
				id: index,
				fileName: file.name,
				fileType: file.type,
				dateUploaded: new Date(),
				size: file.size
			}))));
			setTemporaryFiles([]);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setAppLoading(false);
		}
	}, [setAppLoading, temporaryFiles]);

	const onFileDelete = useCallback(async (fileId: number) => {
		try {
			await Promise.resolve(fileId);
			setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
		} catch (error: any) {
			toast.error(error.message);
		}
	}, []);

	const onFileView = useCallback(async (fileId: number) => {
		try {
			await Promise.resolve(fileId);
			// 	Open file
		} catch (error: any) {
			toast.error(error.message);
		}
	}, []);

	const columns = useMemo(() => {
		return getFileTableColumns({ onView: onFileView, onDelete: onFileDelete });
	}, []);

	useEffect(() => {
		if (temporaryFiles.length > 0) {
			void onFileUpload();
		}
	}, [temporaryFiles.length, onFileUpload]);

	return (
		<>
			<div className="flex flex-col mb-4">
				<h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
					Files {`(${uploadedFiles.length})`}
				</h1>
				<FileUploader
					value={temporaryFiles}
					onValueChange={(files: File[] | null) => {
						if (files && files.length > 0) {
							setTemporaryFiles(prev => prev.concat(files));
						}
					}}
					dropzoneOptions={{
						accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
						multiple: true,
						maxFiles: 5
					}}
					id="file-upload"
					className="relative space-y-1 mt-6"
				>
					<FileInput className="flex items-center justify-between">
						<p className="max-w-2xl text-lg font-light text-foreground mt-2">
							Manage all your documents and files that are part of this project.
						</p>
						<Button variant={"default"} className="p-2 flex items-center" disabled={appLoading}>
							<Plus className="mr-2 h-4 w-4" /> Upload files
						</Button>
					</FileInput>
				</FileUploader>
			</div>
			<Separator />
			<DataTable searchKey="fileName" columns={columns} data={uploadedFiles} noDataText="No files uploaded." />
		</>
	);
};

export default FileTable;
