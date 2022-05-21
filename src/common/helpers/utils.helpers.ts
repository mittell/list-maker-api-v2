export function isEmpty(value: string | undefined): boolean {
	if (value === '' || value === undefined || value === null) {
		return true;
	}

	return false;
}
