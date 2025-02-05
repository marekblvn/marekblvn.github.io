import { writable } from 'svelte/store';
type IconCache = Record<string, string>;
export const iconCache = writable<IconCache>({});
