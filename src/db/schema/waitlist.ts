import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const waitlist = sqliteTable("waitlist", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	companyName: text("company_name"),
	referralSource: text("referral_source"),
	interestCategory: text("interest_category"),
	additionalInfo: text("additional_info"),
	createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
	status: text("status").notNull().default("pending"),
});
