<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<div class="flex w-screen flex-wrap justify-center gap-4 p-4">
	<form
		class="bg-base-200 flex max-w-xl min-w-lg shrink-0 flex-col p-4"
		method="POST"
		use:enhance={() => {
			return ({ update }) => {
				update({
					reset: false
				});
			};
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.open_api_spec()}</legend>
			<textarea
				rows="20"
				class="textarea border-base-content w-full resize-none rounded-md border-2 font-mono"
				name="spec"
			></textarea>
		</fieldset>

		<button class="btn" type="submit">
			{m.generate_ts()}
		</button>
	</form>
	<div class="bg-base-200 mt-0 max-w-xl min-w-lg shrink-0 p-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.generated_code()}</legend>
			<textarea
				rows="20"
				value={form?.toString?.() ?? ''}
				readonly
				class="textarea w-full resize-none font-mono"
			></textarea>
		</fieldset>
	</div>
</div>
