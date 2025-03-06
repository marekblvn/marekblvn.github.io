<script lang="ts">
	import { onMount } from 'svelte';
	import closeIcon from '$lib/static/icons/close.ico';
	import closeIconDisabled from '$lib/static/icons/close-disabled.ico';
	import infoIcon from '$lib/static/icons/info.ico';
	import errorIcon from '$lib/static/icons/error.ico';
	import warningIcon from '$lib/static/icons/Warning.ico';
	import errorSound from '$lib/static/audio/error.mp3';
	interface Props {
		open?: boolean;
		header?: string;
		message?: string;
		type?: 'info' | 'error' | 'warning';
		onClickOk?: (event: MouseEvent) => void;
		onClose?: () => void;
		isClosable?: boolean;
	}
	let {
		open = false,
		header = '',
		message = '',
		type = 'error',
		onClickOk = () => {},
		onClose = () => {},
		isClosable = true
	}: Props = $props();
	let icon = $state(errorIcon);
	onMount(() => {
		switch (type) {
			case 'info':
				icon = infoIcon;
				break;
			case 'warning':
				icon = warningIcon;
				break;
			default:
				icon = errorIcon;
		}
		$effect(() => {
			if (open) {
				playSound();
			}
		});
	});
	async function playSound() {
		if (type !== 'info') {
			const sound = new Audio(errorSound);
			await sound.play();
		}
	}
	async function handleClickOk(event: MouseEvent) {
		try {
			await onClickOk(event);
		} catch (error) {
			console.error(error);
		}
		onClose();
	}
</script>

{#snippet closeButton()}
	<button onclick={onClose} class="btn" disabled={!isClosable}>
		<div class="icon-box">
			<img
				src={isClosable ? closeIcon : closeIconDisabled}
				alt=""
				style="width: 12px; height: 10px; image-rendering: pixelated; user-select: none; -webkit-user-drag: none;"
			/>
		</div>
	</button>
	<style>
		.btn {
			width: 16px;
			height: 14px;
			border-width: 1px;
			border-style: solid;
			border-color: #fff #000 #000 #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 2px;
			background-color: #bfbfbf;
			margin-right: 2px;
		}
		.btn:active:not(:disabled) {
			border-color: #000 #fff #fff #000;
		}
		.icon-box {
			border-width: 1px;
			border-style: solid;
			border-color: #dbdbdb #808080 #808080 #dbdbdb;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.btn:active:not(:disabled) .icon-box {
			border-color: #808080 #dbdbdb #dbdbdb #808080;
		}
	</style>
{/snippet}

{#if open}
	<div class="overlay">
		<div class="alert-box">
			<div class="alert-box-inner-frame">
				<div class="header-bar">
					<span class="header">{header}</span>
					{@render closeButton()}
				</div>
				<div class="content">
					<div class="alert">
						<img class="icon" src={icon} alt="" />
						<div class="message">
							{message}
						</div>
					</div>
					<button class="ok-button" onclick={handleClickOk}>
						<div class="inner-button-borders">OK</div>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.alert-box {
		background-color: #bfbfbf;
		width: 300px;
		border-width: 1px;
		border-style: solid;
		border-color: #fff #000 #000 #fff;
	}
	.alert-box-inner-frame {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
	}
	.header-bar {
		width: 100%;
		height: 18px;
		background: linear-gradient(to right, #00007b, #1085d2);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.header {
		font-family: 'Pixelated MS Sans Serif Bold', sans-serif;
		font-size: 11px;
		font-weight: 500;
		color: #fff;
		vertical-align: middle;
		user-select: none;
		margin-left: 4px;
	}
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.alert {
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: center;
		flex-grow: 1;
		padding: 16px;
		width: calc(100% - 32px);
		column-gap: 16px;
	}
	.icon {
		flex-grow: 80px;
		user-select: none;
		width: 32px;
		height: 32px;
	}
	.message {
		flex-grow: 1;
		font-size: 11px;
	}
	.ok-button {
		flex-grow: 20px;
		width: 80px;
		margin-bottom: 16px;
		font-family: 'Pixelated MS Sans Serif', sans-serif;
		font-size: 12px;
		border-width: 1px;
		border-style: solid;
		border-color: #fff #000 #000 #fff;
		background-color: #bfbfbf;
		padding: 0;
	}
	.ok-button:active {
		border-color: #000 #fff #fff #000;
	}
	.inner-button-borders {
		border-width: 1px;
		border-style: solid;
		border-color: #dbdbdb #808080 #808080 #dbdbdb;
		padding: 2px;
	}
	.ok-button:active .inner-button-borders {
		border-color: #808080 #dbdbdb #dbdbdb #808080;
	}
</style>
