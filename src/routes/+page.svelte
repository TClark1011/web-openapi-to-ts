<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let resultElement: HTMLTextAreaElement | undefined = $state();
	let copyButtonLabel = $state(m.copy());

	const copyResultToClipboard = async () => {
		if (!resultElement) return;

		resultElement.select();
		resultElement.setSelectionRange(0, 99999); // For mobile devices
		await navigator.clipboard.writeText(resultElement.value);

		copyButtonLabel = m.copy_success();
		setTimeout(() => {
			copyButtonLabel = m.copy();
		}, 2000);
	};

	$effect(() => {
		if (!form || form.success) return; // no submission yet

		window.alert(form.message);
	});
</script>

<div class="prose p-4">
	<h1>{m.page_title()}</h1>
	<p>{m.page_description()}</p>
</div>

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
			<textarea rows="20" class="textarea w-full resize-none rounded-md font-mono" name="spec"
			></textarea>
		</fieldset>

		<button class="btn btn-primary" type="submit">
			{m.generate_ts()}
		</button>
	</form>
	<div class="bg-base-200 mt-0 max-w-xl min-w-lg shrink-0 p-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.generated_code()}</legend>
			<textarea
				bind:this={resultElement}
				rows="20"
				value={form?.typescriptCode ?? ''}
				readonly
				class="textarea w-full resize-none font-mono"
			></textarea>
		</fieldset>
		<button class="btn btn-secondary w-full" onclick={copyResultToClipboard}>
			{copyButtonLabel}
		</button>
	</div>
</div>
