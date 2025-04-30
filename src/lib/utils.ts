export const safeJSONParse = (text: string) => {
	try {
		return JSON.parse(text) as unknown;
	} catch (e) {
		return undefined;
	}
}