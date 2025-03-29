import { useState } from "react";

export const useAuthState = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const resetState = () => {
		setError(null);
		setSuccess(null);
		setLoading(false);
	};

	return {
		error,
		setError,
		success,
		setSuccess,
		loading,
		setLoading,
		resetState,
	};
};
