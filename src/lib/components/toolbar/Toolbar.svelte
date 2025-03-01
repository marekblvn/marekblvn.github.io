<script lang="ts">
	let activePopover: string | null = $state(null);
	function togglePopover(button: string) {
		activePopover = activePopover === button ? null : button;
		if (activePopover) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}
	function closePopover() {
		activePopover = null;
	}
	function getPopoverPosition(button: HTMLButtonElement) {
		const rect = button.getBoundingClientRect();
		return rect;
	}
	function handleClickOutside(event: MouseEvent) {
		const popoverElements = document.querySelectorAll('.popover');
		let clickedInsidePopover = false;
		popoverElements.forEach((popover) => {
			if (popover.contains(event.target as Node)) {
				clickedInsidePopover = true;
			}
		});
		if (!clickedInsidePopover) {
			closePopover();
		}
	}
	let fileButton: HTMLButtonElement | null = $state(null);
	let editButton: HTMLButtonElement | null = $state(null);
	let searchButton: HTMLButtonElement | null = $state(null);
	let helpButton: HTMLButtonElement | null = $state(null);
</script>

<div class="window-toolbar">
	<button
		class:active={activePopover === 'file'}
		onclick={() => togglePopover('file')}
		bind:this={fileButton}
	>
		<span>F</span>ile
	</button>
	<button
		class:active={activePopover === 'edit'}
		onclick={() => togglePopover('edit')}
		bind:this={editButton}
	>
		<span>E</span>dit
	</button>
	<button
		class:active={activePopover === 'search'}
		onclick={() => togglePopover('search')}
		bind:this={searchButton}
	>
		<span>S</span>earch
	</button>
	<button
		class:active={activePopover === 'help'}
		onclick={() => togglePopover('help')}
		bind:this={helpButton}
	>
		<span>H</span>elp
	</button>
</div>

{#if activePopover === 'file'}
	{@const popoverPosition = getPopoverPosition(fileButton)}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		role="dialog"
		aria-labelledby="fileMenu"
		class="popover"
		style="top: {popoverPosition.bottom}px; left: {popoverPosition.left}px;"
	>
		<div role="menu" aria-label="File menu" tabindex="0">
			<p>File Menu</p>
		</div>
	</div>
{/if}
{#if activePopover === 'edit'}
	{@const popoverPosition = getPopoverPosition(editButton)}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		role="dialog"
		aria-labelledby="editMenu"
		class="popover"
		style="top: {popoverPosition.bottom}px; left: {popoverPosition.left}px;"
	>
		<div role="menu" aria-label="Edit menu" tabindex="0">
			<p>Edit Menu</p>
		</div>
	</div>
{/if}
{#if activePopover === 'search'}
	{@const popoverPosition = getPopoverPosition(searchButton)}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		role="dialog"
		aria-labelledby="searchButton"
		class="popover"
		style="top: {popoverPosition.bottom}px; left: {popoverPosition.left}px;"
	>
		<div role="menu" aria-label="Edit menu" tabindex="0">
			<p>Search Menu</p>
		</div>
	</div>
{/if}
{#if activePopover === 'help'}
	{@const popoverPosition = getPopoverPosition(helpButton)}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		role="dialog"
		aria-labelledby="helpButton"
		class="popover"
		style="top: {popoverPosition.bottom}px; left: {popoverPosition.left}px;"
	>
		<div role="menu" aria-label="Help menu" tabindex="0">
			<p>Help Menu</p>
		</div>
	</div>
{/if}

<style>
	.window-toolbar {
		height: 20px;
		margin-bottom: 2px;
		display: flex;
		flex-direction: row;
		justify-content: start;
		column-gap: 0px;
	}
	.window-toolbar > button {
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		font-size: 11px;
		line-height: 10px;
		padding-right: 4px;
		padding-left: 5px;
		height: 100%;
		border: none;
		background-color: #bfbfbf;
	}
	button.active {
		padding-right: 3px;
		padding-left: 4px;
		border-width: 1px;
		border-style: solid;
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
	button:hover:not(.active) {
		padding-right: 3px;
		padding-left: 4px;
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
	}
	button > span {
		padding: 0;
		letter-spacing: 0px;
		text-decoration: underline;
	}
	.popover {
		position: fixed;
		background-color: #f0f0f0;
		border: 1px solid #808080;
		padding: 5px;
		width: 120px;
		z-index: 100;
	}
	.popover div {
		padding: 5px;
		background-color: #dcdcdc;
	}
</style>
