import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import openapiTS, { astToString } from "openapi-typescript";
import { safeJSONParse } from "$lib/utils";

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const spec = formData.get("spec");

		if (!spec) {
			return fail(400, { spec: "Spec is required" });
		}

		const parsed = safeJSONParse(spec.toString());

		if (!parsed) {
			return fail(400, { spec: "Spec is not valid JSON" });
		}

		const typescriptAst = await openapiTS(parsed);

		const typescriptCode = astToString(typescriptAst);

		return typescriptCode.trim();
	}
} satisfies Actions;