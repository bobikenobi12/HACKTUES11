import { cn } from "@/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { Progress } from "../ui/progress";

import { useMessages } from "@/hooks/useMessages";
import i18n from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { bg, enGB as enGbm } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FileUploader } from "../ui/file-uploader";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UploadedFilesCard } from "../ui/uploaded-files-card";

export interface NewEmployeeFormProps {
	navigateTo?: string;
	className?: string;
}

const newEmployeeSchema = z.object({
	employeeName: z.string({
		required_error: i18n.t("auth:errors.employeeName"),
	}),
	employeeBirthday: z.date({
		required_error: i18n.t("auth:errors.employeeBirthday"),
	}),
	employeeCV: z.array(
		z.instanceof(File, { message: i18n.t("auth:errors.employeeCV") })
	),
});

type NewEmployeeSchema = z.infer<typeof newEmployeeSchema>;

export const NewEmployeeForm: React.FC<NewEmployeeFormProps> = ({
	navigateTo,
	className,
	...props
}) => {
	const { t } = useMessages("auth");

	const form = useForm<NewEmployeeSchema>({
		resolver: zodResolver(newEmployeeSchema),
		mode: "onSubmit",
		shouldFocusError: false,
		defaultValues: {
			employeeName: "",
			employeeBirthday: undefined,
			employeeCV: [],
		},
	});

	const onSubmit = (values: NewEmployeeSchema) => {
		// login.mutate(values);
		console.log(values);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Progress />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyDown={(e) => {
						if (e.key === "Enter") form.handleSubmit(onSubmit)();
					}}
				>
					<div className="grid gap-6">
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="employeeName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("employee.name.label")}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t(
													"employee.name.placeholder"
												)}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="employeeBirthday"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("employee.birthday.label")}
										</FormLabel>
										<FormControl>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant={"outline"}
														className={cn(
															"w-[240px] justify-start text-left font-normal",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														<CalendarIcon />
														{field.value ? (
															format(
																field.value,
																"PPP",
																{
																	locale:
																		i18n.language ===
																		"en-US"
																			? enGbm
																			: bg,
																}
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={(date) => {
															field.onChange(
																date
															);
														}}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="employeeCV"
								render={({ field }) => (
									<div className="space-y-6">
										<FormItem className="w-full">
											<FormLabel>
												{t("employee.cv.label")}
											</FormLabel>
											<FormControl>
												<FileUploader
													value={field.value}
													onValueChange={
														field.onChange
													}
													maxFileCount={1}
													maxSize={10 * 1024 * 1024}
													// progresses={progresses}
													// pass the onUpload function here for direct upload
													// onUpload={uploadFiles}
													// disabled={false}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
										{field.value?.length ? (
											<UploadedFilesCard
												uploadedFiles={field.value}
											/>
										) : null}
									</div>
								)}
							/>
						</div>
						<Button type="submit" className="w-full">
							{t("employee.analyzeAction")}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
