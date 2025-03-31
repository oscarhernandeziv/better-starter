import { db } from "@/drizzle";
import * as schema from "@/drizzle/schema/auth";
import type { Account, Session, User } from "@/src/entities/models/auth";
import { eq } from "drizzle-orm";

// Internal database types
type DbUser = typeof schema.user.$inferSelect;
type DbSession = typeof schema.session.$inferSelect;
type DbAccount = typeof schema.account.$inferSelect;

// Type adapters to convert between DB and entity types
const mapDbUserToUser = (dbUser: DbUser): User => ({
	...dbUser,
	// Convert null to undefined for optional fields
	twoFactorEnabled:
		dbUser.twoFactorEnabled === null ? undefined : dbUser.twoFactorEnabled,
	isAnonymous: dbUser.isAnonymous === null ? undefined : dbUser.isAnonymous,
});

const mapDbSessionToSession = (dbSession: DbSession): Session => ({
	...dbSession,
	// Convert null to undefined for optional fields
	ipAddress: dbSession.ipAddress === null ? undefined : dbSession.ipAddress,
	userAgent: dbSession.userAgent === null ? undefined : dbSession.userAgent,
});

const mapDbAccountToAccount = (dbAccount: DbAccount): Account => ({
	...dbAccount,
	// Convert null to undefined for optional fields
	accessToken:
		dbAccount.accessToken === null ? undefined : dbAccount.accessToken,
	refreshToken:
		dbAccount.refreshToken === null ? undefined : dbAccount.refreshToken,
	idToken: dbAccount.idToken === null ? undefined : dbAccount.idToken,
	accessTokenExpiresAt:
		dbAccount.accessTokenExpiresAt === null
			? undefined
			: dbAccount.accessTokenExpiresAt,
	refreshTokenExpiresAt:
		dbAccount.refreshTokenExpiresAt === null
			? undefined
			: dbAccount.refreshTokenExpiresAt,
	scope: dbAccount.scope === null ? undefined : dbAccount.scope,
	password: dbAccount.password === null ? undefined : dbAccount.password,
});

export const AuthRepository = {
	async getUserById(userId: string): Promise<User | undefined> {
		const users = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.id, userId));

		return users[0] ? mapDbUserToUser(users[0]) : undefined;
	},

	async getUserByEmail(email: string): Promise<User | undefined> {
		const users = await db
			.select()
			.from(schema.user)
			.where(eq(schema.user.email, email));

		return users[0] ? mapDbUserToUser(users[0]) : undefined;
	},

	async getSessionById(sessionId: string): Promise<Session | undefined> {
		const sessions = await db
			.select()
			.from(schema.session)
			.where(eq(schema.session.id, sessionId));

		return sessions[0] ? mapDbSessionToSession(sessions[0]) : undefined;
	},

	async getSessionsByUserId(userId: string): Promise<Session[]> {
		const sessions = await db
			.select()
			.from(schema.session)
			.where(eq(schema.session.userId, userId));

		return sessions.map(mapDbSessionToSession);
	},

	async getAccountsByUserId(userId: string): Promise<Account[]> {
		const accounts = await db
			.select()
			.from(schema.account)
			.where(eq(schema.account.userId, userId));

		return accounts.map(mapDbAccountToAccount);
	},
};
