import { FileUploaderItem } from "@/components/ui/file-uploader";
import { BsFiletypePdf, BsFiletypeTxt } from "react-icons/bs";
import { useCallback } from "react";

type UploadedFileProps = {
	file: File
	index: number
}

const UploadedFile = (props: UploadedFileProps) => {
	const { file, index } = props;

	const formattedFileSize = useCallback((fileSizeInBytes: number) => {
		const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
		if (Number(fileSizeInMB) < 1) {
			const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
			return `${fileSizeInKB} KB`;
		}
		return `${fileSizeInMB} MB`;

	}, []);

	return (
		<FileUploaderItem index={index} className="flex border justify-between p-5">
			<span>{file.type === "application/pdf" ? <BsFiletypePdf size={26} /> : <BsFiletypeTxt />}</span>
			<div className="flex flex-col gap-y-4 ml-4">
				<p>
					{file.name}
				</p>
				<p>
					{formattedFileSize(file.size)}
				</p>
			</div>
		</FileUploaderItem>
	);
};

export default UploadedFile;
