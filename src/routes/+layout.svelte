<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>OpenAPI to Typescript Code</title>
	<meta name="description" content="Convert OpenAPI specs to TypeScript code from your browser" />
</svelte:head>

{@render children()}
