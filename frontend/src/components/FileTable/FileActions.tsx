import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash, View } from "lucide-react";
import { UploadedFile } from "@/models/UploadedFile";
import { toast } from "react-toastify";

type FileActionsProps = {
	data: UploadedFile;
	onDelete: (fileId: number) => Promise<void>;
	onView: (fileId: number) => Promise<void>;
}

const FileActions = (props: FileActionsProps) => {
	const { data, onView, onDelete } = props;

	const onFileDelete = useCallback(async () => {
		try {
			await onDelete(data.id);
		} catch (error: any) {
			toast.error(error.message);
		}
	}, [onDelete]);

	const onFileView = useCallback(async () => {
		try {
			await onView(data.id);
		} catch (error: any) {
			toast.error(error.message);
		}
	}, [onView]);

	return (
		<div className="space-x-4">
			<Button className="p-2" onClick={onFileView}>
				<View /> View
			</Button>
			<Button className="p-2" variant="destructive" onClick={onFileDelete}>
				<Trash /> Delete
			</Button>
		</div>
	);
};

export default FileActions;
