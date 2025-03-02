import { writable } from 'svelte/store';
export const activeTabCache = writable<string>('/');
