import { RegistrationToggles } from "@/components/admin/toggles/RegistrationSettings";
import { PermissionType } from "@/lib/constants/permission";
import { userHasPermission } from "@/lib/utils/server/admin";
import { redisMGet } from "@/lib/utils/server/redis";
import { parseRedisBoolean, parseRedisNumber } from "@/lib/utils/server/redis";
import { getCurrentUser } from "@/lib/utils/server/user";
import c from "config";
import { notFound } from "next/dist/client/components/navigation";

export default async function Page() {
	const [defaultRegistrationEnabled, defaultRSVPsEnabled, defaultRSVPLimit]: (
		| string
		| null
	)[] = await redisMGet(
		"config:registration:registrationEnabled",
		"config:registration:allowRSVPs",
		"config:registration:maxRSVPs",
	);

	const user = await getCurrentUser();

	if (!userHasPermission(user, PermissionType.MANAGE_REGISTRATION))
		return notFound();

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Registration & Sign-in
				</h2>
			</div>

			<RegistrationToggles
				defaultRegistrationEnabled={parseRedisBoolean(
					defaultRegistrationEnabled,
					true,
				)}
				defaultRSVPsEnabled={parseRedisBoolean(
					defaultRSVPsEnabled,
					true,
				)}
				defaultRSVPLimit={parseRedisNumber(
					defaultRSVPLimit,
					c.rsvpDefaultLimit,
				)}
			/>
		</div>
	);
}
