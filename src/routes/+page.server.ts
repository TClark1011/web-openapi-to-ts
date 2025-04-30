import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import openapiTS, { astToString } from "openapi-typescript";
import { safeJSONParse } from "$lib/utils";
import { m } from "$lib/paraglide/messages";

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const spec = formData.get("spec")?.toString()?.trim();

		if (!spec) {
			return fail(400, { success: false, message: m["errors.no_spec"]() });
		}

		const parsed = safeJSONParse(spec.toString());

		if (parsed === undefined) {
			return fail(400, { success: false, message: m["errors.invalid_json"](), });
		}

		const typescriptAst = await openapiTS(parsed).catch(() => undefined);

		if (!typescriptAst) {
			return fail(400, { success: false, message: m["errors.invalid_openapi"]() });
		}

		const typescriptCode = astToString(typescriptAst);

		return {
			success: true,
			typescriptCode,
		}
	}
} satisfies Actions;