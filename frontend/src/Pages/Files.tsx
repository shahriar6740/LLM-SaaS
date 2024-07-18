import { FileInput, FileUploader, FileUploaderContent } from "@/components/ui/file-uploader";
import { Controller, useForm } from "react-hook-form";
import { FileUpload } from "@/models/form/FileUpload";
import { FileUp } from "lucide-react";
import UploadedFile from "@/components/UploadedFile";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useAppContext } from "@/context/AppContext";

const Files = () => {
	const { appLoading } = useAppContext();
	const { register, handleSubmit, control, watch } = useForm<FileUpload>({
		defaultValues: {
			files: []
		}
	});

	const onSubmit = useCallback((data: FileUpload) => {
		console.log(data);
	}, []);

	return (
		<div>
			<h1
				className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
				Files
			</h1>
			<p className="max-w-2xl text-lg font-light text-foreground mt-2">
				Manage all your documents and files that have been uploaded as part of this project.
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller name="files" control={control} render={({ field: { value, name, ref, onChange } }) => {
					return (
						<FileUploader
							value={value}
							onValueChange={onChange}
							dropzoneOptions={{
								accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
								multiple: true,
								maxFiles: 5
							}}
							ref={ref}
							id={name}
							className="relative space-y-1 w-full mt-6"
						>
							<FileInput className="border border-dashed border-gray-500 h-36 flex justify-center items-center">
								{/*<Button variant={"outline"} className="h-full">Upload a file</Button>*/}
								<div className="border-none flex flex-col w-fit p-4 justify-center items-center gap-y-4">
									<FileUp size={40} />
									<span>
										<span className="underline">Click to upload</span>{" "} or drag & drop
									</span>
								</div>
							</FileInput>
							<FileUploaderContent className="gap-4">
								{
									watch("files").map((file, index) => (
										<UploadedFile file={file} index={index} />
									))
								}
							</FileUploaderContent>
						</FileUploader>
					);
				}}
				/>

				<div className="w-full flex justify-end my-4">
					<Button type="submit" variant="default" className="p-2" disabled={watch("files").length <= 0 || appLoading}>
						Upload Files
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Files;
