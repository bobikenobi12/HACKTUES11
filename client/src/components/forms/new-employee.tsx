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
import { ScrollArea } from "../ui/scroll-area";
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
	employeeCV: z
		.array(
			z.instanceof(File, { message: i18n.t("auth:errors.employeeCV") })
		)
		.refine((value) => value.length > 0, {
			message: i18n.t("auth:errors.employeeCV"),
		}),
});

type NewEmployeeSchema = z.infer<typeof newEmployeeSchema>;

export const NewEmployeeForm: React.FC<NewEmployeeFormProps> = ({
	navigateTo,
	className,
	...props
}) => {
	const [step, setStep] = React.useState<"initial" | "cv" | "review">(
		"initial"
	);

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
			<Progress
				value={step === "initial" ? 0 : step === "cv" ? 50 : 100}
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyDown={(e) => {
						if (e.key === "Enter") form.handleSubmit(onSubmit)();
					}}
				>
					<div className="grid gap-6">
						{step === "initial" ? (
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
													{t(
														"employee.birthday.label"
													)}
												</FormLabel>
												<FormControl>
													<Popover>
														<PopoverTrigger asChild>
															<Button
																variant={
																	"outline"
																}
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
																		Pick a
																		date
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
																selected={
																	field.value
																}
																onSelect={(
																	date
																) => {
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

								<Button
									type="button"
									onClick={() => {
										form.trigger("employeeName");
										form.trigger("employeeBirthday");
										if (
											form.formState.errors
												.employeeName ||
											form.formState.errors
												.employeeBirthday
										) {
											return;
										}
										setStep("cv");
									}}
									className="w-full"
								>
									{t("employee.nextAction")}
								</Button>
							</div>
						) : step === "cv" ? (
							<ScrollArea className="h-[400px]">
								<div className="grid gap-6 pr-4 pb-4">
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
															maxSize={
																10 * 1024 * 1024
															}
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
														uploadedFiles={
															field.value
														}
													/>
												) : null}
											</div>
										)}
									/>
									<Button
										type="submit"
										className="w-full"
										onClick={() => {
											form.trigger("employeeCV");
											if (
												form.formState.errors.employeeCV
											) {
												return;
											}
											setStep("review");
											form.handleSubmit(onSubmit)();
										}}
									>
										{t("employee.analyzeAction")}
									</Button>
								</div>
							</ScrollArea>
						) : (
							<div className="grid gap-2">
								<div className="text-center">
									<h2 className="text-xl font-semibold">
										{t("employee.confirmation.title")}
									</h2>
									<p className="mt-2 text-gray-600">
										{t("employee.confirmation.message")}
									</p>
									<div className="mt-4">
										<svg
											className="animate-spin h-8 w-8 text-blue-500 mx-auto"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
									</div>
									<p className="mt-4 text-gray-600">
										{t("employee.confirmation.waitMessage")}
									</p>
									<p className="mt-2 text-gray-600">
										{t(
											"employee.confirmation.closeMessage"
										)}
									</p>
								</div>
							</div>
						)}
					</div>
				</form>
			</Form>
		</div>
	);
};
