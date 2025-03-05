<script lang="ts">
	import { goto } from '$app/navigation';
	import { activeTabCache } from '$lib/stores/active-tab';
	import { tabCache } from '$lib/stores/tabs';
	interface Props {
		label?: string;
		icon?: string;
		route: string;
		onClick?: () => void;
	}
	let { icon = 'directory_closed', label = 'Unnamed', route, onClick = () => {} }: Props = $props();

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
>
	<div class="rect">
		<img src={`/src/lib/static/icons/${icon}.ico`} alt="icon" class="icon" />
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
	.icon {
		width: 32px;
		height: 32px;
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
