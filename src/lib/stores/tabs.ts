import { writable } from 'svelte/store';
export interface Tab {
	title: string;
	icon: string;
}
export const tabCache = writable<Array<Tab>>([]);
