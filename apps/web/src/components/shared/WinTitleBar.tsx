import Image from "next/image";
import c from "config";

const WindowsControlButtons = () => {
	return (
		<div className="flex gap-0.5">
			<button
				className="flex h-[18px] w-[18px] items-center justify-center border bg-card text-xs font-bold leading-none"
				style={{
					borderTopColor: "#ffffff",
					borderLeftColor: "#ffffff",
					borderRightColor: "#404040",
					borderBottomColor: "#404040",
				}}
			>
				_
			</button>
			<button
				className="flex h-[18px] w-[18px] items-center justify-center border bg-card text-xs leading-none"
				style={{
					borderTopColor: "#ffffff",
					borderLeftColor: "#ffffff",
					borderRightColor: "#404040",
					borderBottomColor: "#404040",
				}}
			>
				□
			</button>
			<button
				className="flex h-[18px] w-[18px] items-center justify-center border bg-card text-xs font-bold leading-none"
				style={{
					borderTopColor: "#ffffff",
					borderLeftColor: "#ffffff",
					borderRightColor: "#404040",
					borderBottomColor: "#404040",
				}}
			>
				x
			</button>
		</div>
	);
};

const WinTitleBar = ({
	title,
	imagePath,
}: {
	title: string;
	imagePath?: string;
}) => {
	return (
		<div
			className="flex h-7 w-full items-center justify-between px-2"
			style={{
				background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
			}}
		>
			<div className="flex items-center gap-2">
				{imagePath && (
					<Image
						src={imagePath || "/placeholder.svg"}
						alt={c.hackathonName + " Logo"}
						width={16}
						height={16}
						className="pixelated"
					/>
				)}
				<span className="text-xs font-bold text-white">{title}</span>
			</div>
			<WindowsControlButtons />
		</div>
	);
};

export default WinTitleBar;
