<script lang="ts">
	import windowsLogo from '$lib/static/icons/windows.ico';
	let showPopover = $state(false);
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			showPopover = false;
		}
	}
</script>

<button type="button" class:active={showPopover} onclick={() => (showPopover = !showPopover)}>
	<div class="rect">
		<div class="text">
			<img src={windowsLogo} alt="windows" class="logo" />
			<p>Start</p>
		</div>
	</div>
</button>

{#if showPopover}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="popover"
		role="dialog"
		aria-modal="true"
		onkeydown={handleKeyDown}
		onclick={() => (showPopover = false)}
	>
		<div
			class="popover-content"
			role="dialog"
			aria-modal="true"
			onkeydown={handleKeyDown}
			onclick={(e) => e.stopPropagation()}
		>
			<p>Start menu</p>
		</div>
	</div>
{/if}

<style>
	button {
		padding: 0;
		margin-left: 2px;
		border-width: 1px;
		border-style: solid;
		border-color: #ffffff #000000 #000000 #ffffff;
		background-color: #bfbfbf;
	}
	button.active {
		border-width: 1px;
		border-style: solid;
		border-color: #000000 #ffffff #ffffff #000000;
		background: repeating-conic-gradient(#f0f0f0 0deg 90deg, #dbdbdb 90deg 180deg);
		background-size: 5px 5px;
	}
	button:focus-within .text {
		outline: dotted 1px #000;
	}
	.popover {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}
	.popover-content {
		background: white;
		position: relative;
		bottom: 30px;
		left: 2px;
	}
	.rect {
		display: flex;
		align-items: center;
		height: 24px;
		padding: 0 3px 0 3px;
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
	}
	.rect:active {
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
	.text {
		height: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
		column-gap: 1px;
		font-family: 'Pixelated MS Sans Serif Bold', sans-serif;
		font-weight: 900;
	}
	.logo {
		height: 20px;
		width: 20px;
	}
</style>
