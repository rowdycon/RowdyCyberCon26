import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { DropdownSwitcher } from "@/components/shared/ThemeSwitcher";
import DefaultDropdownTrigger from "../dash/shared/DefaultDropDownTrigger";
import MobileNavBarLinks from "./MobileNavBarLinks";
import { getUser } from "db/functions";
import { clientLogOut } from "@/lib/utils/server/user";
import Restricted from "../Restricted";
import { PermissionType } from "@/lib/constants/permission";

export default async function ProfileButton() {
	const clerkUser = await auth();
	const { userId } = clerkUser;

	// This is our default component if there is no user data
	if (!userId) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className="relative flex items-center justify-center border-2 bg-[#c0c0c0] px-2 py-1 text-sm text-black"
						style={{
							borderTopColor: "#fff",
							borderLeftColor: "#fff",
							borderRightColor: "#000",
							borderBottomColor: "#000",
							boxShadow:
								"inset -1px -1px #808080, inset 1px 1px #dfdfdf",
							fontFamily:
								'"MS Sans Serif", Tahoma, Arial, sans-serif',
						}}
					>
						<DefaultDropdownTrigger />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="mt-1 w-48 rounded-none border-2 bg-[#c0c0c0] p-0 shadow-none dark:bg-[#c0c0c0]"
					style={{
						borderTopColor: "#dfdfdf",
						borderLeftColor: "#dfdfdf",
						borderRightColor: "#000",
						borderBottomColor: "#000",
						boxShadow:
							"inset -1px -1px #808080, inset 1px 1px #fff",
					}}
					align="end"
					forceMount
				>
					<DropdownMenuGroup className="p-1">
						<Link href={`/sign-in`}>
							<DropdownMenuItem className="cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-lg text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Sign In
							</DropdownMenuItem>
						</Link>
						<Link href={`/register`}>
							<DropdownMenuItem className="cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-lg text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Register
							</DropdownMenuItem>
						</Link>
						<MobileNavBarLinks />
						<div className="my-1 h-[2px] border-b border-t border-b-white border-t-[#808080]" />
						{/* <DropdownSwitcher /> */}
						<Link href={`/bug-report`}>
							<DropdownMenuItem className="cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-lg text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Report a Bug
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	// Make request with the clerk data that we may or may not have
	const user = await getUser(userId);

	// If we do not have a fully fledged user, encourage them to complete registration
	if (!user) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						className="relative flex min-w-[75px] items-center justify-center border-2 bg-[#c0c0c0] px-2 py-1 text-sm text-black"
						style={{
							borderTopColor: "#fff",
							borderLeftColor: "#fff",
							borderRightColor: "#000",
							borderBottomColor: "#000",
							boxShadow:
								"inset -1px -1px #808080, inset 1px 1px #dfdfdf",
							fontFamily:
								'"MS Sans Serif", Tahoma, Arial, sans-serif',
						}}
					>
						<DefaultDropdownTrigger />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="mt-1 w-48 rounded-none border-2 bg-[#c0c0c0] p-0 shadow-none dark:bg-[#c0c0c0]"
					style={{
						borderTopColor: "#dfdfdf",
						borderLeftColor: "#dfdfdf",
						borderRightColor: "#000",
						borderBottomColor: "#000",
						boxShadow:
							"inset -1px -1px #808080, inset 1px 1px #fff",
					}}
					align="end"
					forceMount
				>
					<DropdownMenuGroup className="p-1">
						<Link href={`/register`}>
							<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Complete Registration
							</DropdownMenuItem>
						</Link>
						<MobileNavBarLinks />
						<Link href={`/bug-report`}>
							<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Report a Bug
							</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
					<div className="mx-1 my-1 h-[2px] border-b border-t border-b-white border-t-[#808080]" />
					{/* <DropdownSwitcher /> */}
					<SignOutButton redirectUrl={"/"}>
						<DropdownMenuItem className="text-md m-1 cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-[#800000] hover:bg-[#800000] hover:text-white focus:bg-[#800000] focus:text-white">
							Sign out
						</DropdownMenuItem>
					</SignOutButton>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	// Returns only if there is a full user
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className="relative flex min-w-0 items-center justify-center border-2 bg-[#c0c0c0] p-1"
					style={{
						borderTopColor: "#fff",
						borderLeftColor: "#fff",
						borderRightColor: "#000",
						borderBottomColor: "#000",
						boxShadow:
							"inset -1px -1px #808080, inset 1px 1px #dfdfdf",
					}}
				>
					<Avatar className="h-6 w-6 border-2 border-[#808080]">
						<AvatarImage
							src={user.profilePhoto}
							alt={`@${user.hackerTag}`}
						/>
						<AvatarFallback className="bg-[#000080] text-[10px] font-bold text-white">
							{user.firstName.charAt(0) + user.lastName.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="mt-1 w-52 rounded-none border-2 bg-[#c0c0c0] p-0 shadow-none dark:bg-[#c0c0c0]"
				style={{
					borderTopColor: "#dfdfdf",
					borderLeftColor: "#dfdfdf",
					borderRightColor: "#000",
					borderBottomColor: "#000",
					boxShadow: "inset -1px -1px #808080, inset 1px 1px #fff",
				}}
				align="end"
				forceMount
			>
				<DropdownMenuLabel
					className="m-1 border-2 bg-white p-2 font-normal"
					style={{
						borderTopColor: "#808080",
						borderLeftColor: "#808080",
						borderRightColor: "#dfdfdf",
						borderBottomColor: "#dfdfdf",
						boxShadow: "inset -1px -1px #fff, inset 1px 1px #000",
					}}
				>
					<div className="flex flex-col space-y-0.5">
						<p className="text-[12px] font-bold leading-tight text-black">
							{`${user.firstName} ${user.lastName}`}
						</p>
						<p className="text-[11px] font-semibold leading-tight text-[#808080]">
							@{user.hackerTag}
						</p>
					</div>
				</DropdownMenuLabel>
				<div className="mx-1 my-1 h-[2px] border-b border-t border-b-white border-t-[#808080]" />
				<DropdownMenuGroup className="p-1">
					<Link href={`/@${user.hackerTag}`}>
						<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
							Profile
						</DropdownMenuItem>
					</Link>
					<Link href={`/dash/pass`}>
						<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
							Event Pass
						</DropdownMenuItem>
					</Link>

					<Restricted user={user} permissions={PermissionType.ADMIN}>
						<Link href={`/admin`}>
							<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 font-bold text-[#000080] hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
								Admin
							</DropdownMenuItem>
						</Link>
					</Restricted>

					<MobileNavBarLinks />
					<div className="my-1 h-[2px] border-b border-t border-b-white border-t-[#808080]" />
					<Link href={`/bug-report`}>
						<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
							Report a Bug
						</DropdownMenuItem>
					</Link>
					<Link href={"/settings"}>
						<DropdownMenuItem className="text-md cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
							Settings
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<div className="mx-1 my-1 h-[2px] border-b border-t border-b-white border-t-[#808080]" />
				<SignOutButton redirectUrl={"/"}>
					<DropdownMenuItem className="text-md m-1 cursor-pointer rounded-none bg-[#c0c0c0] px-6 py-1.5 text-[#800000] hover:bg-[#800000] hover:text-white focus:bg-[#800000] focus:text-white">
						Sign out
					</DropdownMenuItem>
				</SignOutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export const runtime = "edge";
