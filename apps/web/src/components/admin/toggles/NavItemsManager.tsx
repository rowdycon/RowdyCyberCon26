"use client";

import type { NavItemToggleType } from "@/validators/shared/navitemtoggle";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAction, useOptimisticAction } from "next-safe-action/hooks";
import {
	setItem,
	removeItem,
	toggleItem,
	editItem,
} from "@/actions/admin/modify-nav-item";
import { toast } from "sonner";
import Link from "next/link";
import { Switch } from "@/components/shadcn/ui/switch";

interface NavItemsManagerProps {
	navItems: NavItemToggleType[];
}
interface EditNavItemDialogProps {
	existingName: string;
	existingUrl: string;
	existingEnabled: boolean;
}

export function NavItemsManager({ navItems }: NavItemsManagerProps) {
	const { execute, result, status } = useAction(removeItem, {
		onSuccess: () => {
			toast.dismiss();
			toast.success("NavItem deleted successfully!");
		},
		onError: () => {
			toast.dismiss();
			toast.error("Error deleting NavItem");
		},
	});

	return (
		<div className="pt-10">
			<Table className="rounded-sm border-card bg-panel">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				{/* TODO: FIX MASSIVE BUG WHERE IF ENCODED IS DIFFERENT IT WILL ALL BREAK */}
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead>Link</TableHead>
						<TableHead>Enabled</TableHead>
						<TableHead>Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{navItems.map((item) => (
						<TableRow key={item.name}>
							<TableCell className="font-medium">
								{item.name}
							</TableCell>
							<TableCell>
								<Link className="underline" href={item.url}>
									{item.url}
								</Link>
							</TableCell>
							<TableCell>
								<ToggleSwitch
									itemStatus={item.enabled}
									name={item.name}
								/>
							</TableCell>
							<TableCell className="flex w-full flex-col gap-y-1 md:flex-row md:gap-x-2">
								<EditNavItemDialog
									existingName={item.name}
									existingUrl={item.url}
									existingEnabled={item.enabled}
								/>
								<Button
									onClick={() => {
										toast.dismiss();
										toast.loading("Deleting NavItem...");
										execute(item.name);
									}}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function ToggleSwitch({
	itemStatus,
	name,
}: {
	itemStatus: boolean;
	name: string;
}) {
	const initialData = { itemStatus }; // Initial data matching the shape of toggleItem's return type

	const { execute, optimisticState } = useOptimisticAction(toggleItem, {
		currentState: initialData,
		updateFn: (state, { statusToSet }) => {
			return { itemStatus: statusToSet };
		},
		onError: () => {
			toast.error("Error toggling NavItem");
		},
	});

	return (
		<Switch
			checked={optimisticState.itemStatus}
			onCheckedChange={(checked) =>
				execute({ name, statusToSet: checked })
			}
		/>
	);
}

export function AddNavItemDialog() {
	const [name, setName] = useState<string | null>(null);
	const [url, setUrl] = useState<string | null>(null);
	const [open, setOpen] = useState(false);

	const { execute, status: createStatus } = useAction(setItem, {
		onSuccess: () => {
			setOpen(false);
			toast.success("NavItem created successfully!");
		},
		onError: () => {
			toast.error("Error creating NavItem");
		},
	});

	const isLoading = createStatus === "executing";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-full sm:w-auto">
					<Plus className="mr-1 h-4 w-4" />
					Add Item
				</Button>
			</DialogTrigger>

			<DialogContent className="w-[95vw] max-w-md bg-panel sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New Item</DialogTitle>
					<DialogDescription>
						Create an item to show in the non-dashboard navbar
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-2">
					{/* Name */}
					<div className="flex flex-col gap-1 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
						<Label htmlFor="name" className="sm:text-right">
							Name
						</Label>
						<Input
							id="name"
							placeholder="A Cool Hyperlink"
							onChange={(e) => setName(e.target.value)}
							className="sm:col-span-3"
						/>
					</div>

					{/* URL */}
					<div className="flex flex-col gap-1 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
						<Label htmlFor="url" className="sm:text-right">
							URL
						</Label>
						<Input
							id="url"
							placeholder="https://example.com/"
							onChange={(e) => setUrl(e.target.value)}
							className="sm:col-span-3"
						/>
					</div>
				</div>

				<DialogFooter className="flex-col gap-2 sm:flex-row">
					<Button
						disabled={isLoading}
						onClick={() => {
							if (!name || !url)
								return toast.error(
									"Please fill out all fields.",
								);

							execute({ name, url });
						}}
						className="relative w-full sm:w-auto"
					>
						{isLoading && (
							<Loader2 className="absolute h-4 w-4 animate-spin" />
						)}
						<span className={isLoading ? "invisible" : ""}>
							Create
						</span>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function EditNavItemDialog({
	existingName,
	existingUrl,
	existingEnabled,
}: EditNavItemDialogProps) {
	const [name, setName] = useState<string>(existingName);
	const [url, setUrl] = useState<string>(existingUrl);
	const [open, setOpen] = useState(false);

	const { execute, status: editStatus } = useAction(editItem, {
		onSuccess: () => {
			console.log("Success");
			setOpen(false);
			toast.success("NavItem edited successfully!");
		},
		onError: () => {
			toast.error("Error editing NavItem");
		},
	});
	const isLoading = editStatus === "executing";

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Edit</Button>
			</DialogTrigger>
			<DialogContent className="w-[95vw] max-w-md bg-panel sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Item</DialogTitle>
					<DialogDescription>
						Edit an existing item shown in the non-dashboard navbar
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							onChange={(e) => setName(e.target.value)}
							id="name"
							placeholder="A Cool Hyperlink"
							className="col-span-3"
							value={name}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							URL
						</Label>
						<Input
							onChange={(e) => setUrl(e.target.value)}
							id="name"
							placeholder="https://example.com/"
							className="col-span-3"
							value={url}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						className="relative"
						onClick={() => {
							console.log("Running Action");
							if (!name || !url)
								return alert("Please fill out all fields.");

							execute({
								enabled: existingEnabled,
								existingName,
								name,
								url,
							});
						}}
					>
						{isLoading && (
							<Loader2
								className={"absolute z-50 h-4 w-4 animate-spin"}
							/>
						)}
						<p className={`${isLoading && "invisible"}`}>Update</p>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
