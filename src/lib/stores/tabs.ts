import { writable } from 'svelte/store';
export const tabCache = writable<Array<string>>([]);
