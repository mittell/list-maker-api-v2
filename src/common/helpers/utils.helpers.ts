export function isEmpty(value: string | boolean | undefined): boolean {
	if (value === '' || value === undefined || value === null) {
		return true;
	}

	return false;
}
