import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "./empty-card";

interface UploadedFilesCardProps {
	uploadedFiles: File[];
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Uploaded files</CardTitle>
				<CardDescription>View the uploaded files here</CardDescription>
			</CardHeader>
			<CardContent>
				{uploadedFiles.length > 0 ? (
					<ScrollArea className="pb-4">
						<div className="flex w-max space-x-2.5">
							{uploadedFiles.map((file, index) => {
								const fileURL = URL.createObjectURL(file);
								return (
									<div
										key={index}
										className="relative aspect-video w-64"
									>
										<img
											src={fileURL}
											alt={file.name}
											sizes="(min-width: 640px) 640px, 100vw"
											loading="lazy"
											style={{ objectFit: "fill" }}
											className="rounded-md object-cover"
										/>
									</div>
								);
							})}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				) : (
					<EmptyCard
						title="No files uploaded"
						description="Upload some files to see them here"
						className="w-full"
					/>
				)}
			</CardContent>
		</Card>
	);
}
