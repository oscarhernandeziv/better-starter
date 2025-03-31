import { db } from "@/drizzle";
import { waitlist } from "@/drizzle/schema/waitlist";
import { DatabaseError } from "@/src/entities/errors/common";
import type { WaitlistFormData } from "@/src/entities/models/waitlist";
import { eq } from "drizzle-orm";

/**
 * Create a new waitlist entry
 * @param data Waitlist form data
 * @returns The created waitlist entry
 */
export async function createWaitlistEntry(
	data: WaitlistFormData,
): Promise<WaitlistFormData> {
	try {
		const result = await db.insert(waitlist).values(data).returning();

		if (!result[0]) {
			throw new DatabaseError("Failed to create waitlist entry");
		}

		return result[0] as WaitlistFormData;
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes("UNIQUE constraint failed")
		) {
			throw new DatabaseError("Email already exists in our waitlist");
		}

		throw new DatabaseError(
			error instanceof Error ? error.message : "Unknown database error",
		);
	}
}

/**
 * Get a waitlist entry by email
 * @param email Email to lookup
 * @returns Waitlist entry or null if not found
 */
export async function getWaitlistEntryByEmail(
	email: string,
): Promise<WaitlistFormData | null> {
	try {
		const result = await db
			.select()
			.from(waitlist)
			.where(eq(waitlist.email, email))
			.limit(1);

		return (result[0] as WaitlistFormData) || null;
	} catch (error) {
		throw new DatabaseError(
			error instanceof Error ? error.message : "Unknown database error",
		);
	}
}

/**
 * Update a waitlist entry status
 * @param id Waitlist entry ID
 * @param status New status value
 * @returns Updated waitlist entry
 */
export async function updateWaitlistEntryStatus(
	id: number,
	status: WaitlistFormData["status"],
): Promise<WaitlistFormData> {
	try {
		const result = await db
			.update(waitlist)
			.set({ status })
			.where(eq(waitlist.id, id))
			.returning();

		if (!result[0]) {
			throw new DatabaseError("Waitlist entry not found");
		}

		return result[0] as WaitlistFormData;
	} catch (error) {
		throw new DatabaseError(
			error instanceof Error ? error.message : "Unknown database error",
		);
	}
}
