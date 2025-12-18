import z from "zod";
import c from "config";
import { isProfane } from "no-profanity";
import { NOT_LOCAL_SCHOOL } from "@/lib/constants";

const noProfanityValidator = (val: any) => !isProfane(val);
const noProfanityMessage = "Profanity is not allowed";

export const modifyAccountSettingsSchema = z.object({
	firstName: z.string().min(1).max(50),
	lastName: z.string().min(1).max(50),
	hackerTag: z
		.string()
		.min(1)
		.max(50)
		.refine(noProfanityValidator, noProfanityMessage),
	isSearchable: z.boolean(),
});

export const profileSettingsSchema = z.object({
	pronouns: z.string().min(1).max(15),
	bio: z
		.string()
		.min(1)
		.max(500, { message: "Bio must be less than 500 characters." })
		.refine(noProfanityValidator, noProfanityMessage),
	skills: z.string().min(1).max(20).array(),
	discord: z.string().max(40, {
		message: "Username should not be longer than 40 characters",
	}),
});

const defaultPrettyError = {
	errorMap: () => ({ message: "Please select a value" }),
};

export const registrationSettingsFormValidator = z.object({
	age: z
		.number()
		.min(18, { message: "You must be at least 18 years old to register." })
		.positive({ message: "Value must be positive" })
		.int({ message: "Value must be an integer" })
		.or(z.string())
		.pipe(
			z.coerce
				.number()
				.min(18, {
					message: "You must be at least 18 years old to register.",
				})
				.positive({ message: "Value must be positive" })
				.int({ message: "Value must be an integer" }),
		),
	gender: z.union([
		z.literal("MALE", defaultPrettyError),
		z.literal("FEMALE", defaultPrettyError),
		z.literal("NON-BINARY", defaultPrettyError),
		z.literal("OTHER", defaultPrettyError),
		z.literal("PREFERNOTSAY", defaultPrettyError),
	]),
	phoneNumber: z.string().min(10).max(30, {
		message: "Phone number must be less than 15 characters",
	}),
	countryOfResidence: z.string().length(2),
	isEmailable: z.boolean(),
	university: z.string().min(1).max(200),
	major: z.string().min(1).max(200),
	schoolID: z
		.string()
		.length(c.localUniversityShortIDMaxLength, {
			message: `${c.localUniversitySchoolIDName} must be than ${c.localUniversityShortIDMaxLength} characters.`,
		})
		.or(z.literal(NOT_LOCAL_SCHOOL)),
	levelOfStudy: z.union([
		z.literal("Freshman", defaultPrettyError),
		z.literal("Sophomore", defaultPrettyError),
		z.literal("Junior", defaultPrettyError),
		z.literal("Senior", defaultPrettyError),
		z.literal("Recent Grad", defaultPrettyError),
		z.literal("Other", defaultPrettyError),
	]),
	heardAboutEvent: z
		.union([
			z.literal("Instagram"),
			z.literal("Class Presentation"),
			z.literal("Twitter"),
			z.literal("Event Site"),
			z.literal("Friend"),
			z.literal("Other"),
		])
		.optional(),
	shirtSize: z.union([
		z.literal("S", defaultPrettyError),
		z.literal("M", defaultPrettyError),
		z.literal("L", defaultPrettyError),
		z.literal("XL", defaultPrettyError),
		z.literal("2XL", defaultPrettyError),
		z.literal("3XL", defaultPrettyError),
	]),
	dietaryRestrictions: z.array(z.string()),
	accommodationNote: z.string().optional(),
	github: z
		.string()
		.max(50, { message: "Username must be less than 50 characters" })
		.optional(),
	linkedin: z
		.string()
		.max(50, { message: "Username must be less than 50 characters" })
		.optional(),
	personalWebsite: z
		.string()
		.max(100, { message: "URL must be less than 100 characters" })
		.optional(),
	uploadedFile: z.string().optional(),
});
