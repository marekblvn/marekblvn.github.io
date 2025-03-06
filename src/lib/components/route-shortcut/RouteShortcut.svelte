<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTabCache } from '$lib/stores/active-tab';
	import { tabCache } from '$lib/stores/tabs';
	import defaultIcon from '$lib/static/icons/directory_closed.ico';
	interface Props {
		label?: string;
		icon?: string;
		route: string;
		index: number;
		onMove: (from: number, to: number) => void;
	}
	let { icon = defaultIcon, label = 'Unnamed', route, index, onMove }: Props = $props();

	function handleDoubleClick() {
		tabCache.update((cache) => {
			if (!cache.some((tab) => tab.title === label)) {
				return [...cache, { title: label, icon }];
			}

			return cache;
		});
		activeTabCache.set(label);
		goto(route);
	}

	function handleDragStart(event: DragEvent) {
		event.dataTransfer?.setData('text/plain', index.toString());
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const fromIndex = Number(event.dataTransfer?.getData('text/plain'));
		if (!isNaN(fromIndex) && fromIndex !== index) {
			onMove(fromIndex, index);
		}
	}
</script>

<a
	type="button"
	href={route}
	class="link"
	onclick={(e) => {
		e.preventDefault();
		return false;
	}}
	ondblclick={handleDoubleClick}
	ondragstart={handleDragStart}
	ondragover={(e) => e.preventDefault()}
	ondrop={handleDrop}
>
	<div class="rect">
		<img src={icon} alt="icon" class="icon" />
		<div class="label-div">
			{label}
		</div>
	</div>
</a>

<style>
	.link {
		color: inherit;
		text-decoration: inherit;
	}
	.link:focus-visible {
		color: inherit;
		text-decoration: inherit;
	}
	.link:visited * {
		border: solid 1px #000;
	}
	.rect {
		width: 75px;
		height: 75px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		row-gap: 4px;
		text-align: center;
	}
	.rect:active {
		cursor: grabbing;
	}
	.icon {
		width: 32px;
		height: 32px;
		image-rendering: pixelated;
	}
	.label-div {
		width: 71px;
		height: 37px;
		padding: 0 2px;
		margin-top: 2px;
		overflow: hidden; /* Hide overflowing text */
		display: -webkit-box;
		-webkit-line-clamp: 3; /* Number of lines before ellipsis appears */
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		font-style: 'Pixelated MS Sans Serif', sans-serif;
		font-size: 11px;
		font-weight: 500;
		color: #fff;
	}
</style>
