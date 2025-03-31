export class AppError extends Error {
	constructor(
		message: string,
		readonly statusCode: number = 400,
		readonly code?: string,
	) {
		super(message);
		this.name = this.constructor.name;
		// Use provided code or fallback to class name
		this.code = code || this.constructor.name;
	}
}

export class NotFoundError extends AppError {
	constructor(entity: string) {
		super(`${entity} not found`, 404);
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Not authorized") {
		super(message, 401);
	}
}

// Consolidate auth errors here rather than in separate file
export class AuthenticationError extends AppError {
	constructor(message = "Authentication failed", code?: string) {
		super(message, 401, code);
	}
}

// Add common error types that were previously subclasses
export class InvalidCredentialsError extends AppError {
	constructor(message = "Invalid credentials") {
		super(message, 401, "CredentialsError");
	}
}

export class SessionExpiredError extends AppError {
	constructor(message = "Session has expired") {
		super(message, 401, "SessionExpiredError");
	}
}

export class RegistrationError extends AppError {
	constructor(message = "Registration failed", code?: string) {
		super(message, 400, code || "RegistrationError");
	}
}

export class EmailInUseError extends AppError {
	constructor() {
		super("Email is already in use", 400, "EmailInUseError");
	}
}

export class UsernameInUseError extends AppError {
	constructor() {
		super("Username is already in use", 400, "UsernameInUseError");
	}
}

export class DatabaseError extends AppError {
	constructor(message = "Database operation failed") {
		super(message, 500, "DatabaseError");
	}
}
