import { writable } from 'svelte/store';
type TabCache = Array<string>;
export const tabCache = writable<TabCache>([]);
