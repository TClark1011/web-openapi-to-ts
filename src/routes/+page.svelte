<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let resultElement: HTMLTextAreaElement | undefined = $state();
	let copyButtonLabel = $state(m.copy());

	let isLoading = $state(false);

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
		class="bg-base-200 flex max-w-xl min-w-lg shrink-0 flex-col p-4 pt-2"
		method="POST"
		use:enhance={() => {
			isLoading = true;
			return async ({ update }) => {
				await update({
					reset: false
				});
				isLoading = false;
			};
		}}
	>
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.open_api_spec()}</legend>
			<textarea rows="20" class="textarea w-full resize-none" name="spec"></textarea>
		</fieldset>

		<button disabled={isLoading} class="btn btn-primary btn-loading" type="submit">
			{#if isLoading}
				<span class="loading loading-dots"></span>
			{/if}
			{m.generate_ts()}
		</button>
	</form>
	<div class="bg-base-200 mt-0 max-w-xl min-w-lg shrink-0 p-4 pt-2">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">{m.generated_code()}</legend>
			<textarea
				bind:this={resultElement}
				rows="20"
				value={form?.typescriptCode ?? ''}
				readonly
				class="textarea w-full resize-none"
			></textarea>
		</fieldset>
		<button
			disabled={!form?.success}
			class="btn btn-primary w-full"
			onclick={copyResultToClipboard}
		>
			{copyButtonLabel}
		</button>
	</div>
</div>
