<script lang="ts">
	import AddressBar from '../address-bar/AddressBar.svelte';
	import DirectoryTools from '../directory-tools/DirectoryTools.svelte';
	import Toolbar from '../toolbar/Toolbar.svelte';
</script>

{#snippet horizontalDivider()}
	<div class="horizontal-divider"></div>
{/snippet}

<div class="outer-frame">
	<div class="inner-frame">
		<div class="toolbar">
			<div class="toolbar-item">
				<Toolbar />
			</div>
			{@render horizontalDivider()}
			<div class="toolbar-item">
				<DirectoryTools />
			</div>
			{@render horizontalDivider()}
			<div class="toolbar-item">
				<AddressBar />
			</div>
		</div>
	</div>
</div>

<style>
	.outer-frame {
		border-bottom: solid 1px #fff;
		margin-bottom: 4px;
	}
	.inner-frame {
		border-width: 1px;
		border-style: solid;
		border-color: #808080;
	}
	.toolbar {
		display: flex;
		flex-direction: column;
		row-gap: 1px;
		padding: 2px 2px 0;
	}
	.toolbar-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
	}
	.horizontal-divider {
		width: 100%;
		border-bottom: solid 1px #fff;
		border-top: solid 1px #808080;
		flex-grow: 4px;
	}
</style>
