import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultObj = { streak: 0, items: [], lastDay: new Date(), image: 'water7' }
const initialValue = browser ? JSON.parse(window.localStorage.getItem('affirmations')) ?? defaultObj : defaultObj;
export const affirmations = writable(initialValue)

affirmations.subscribe((val) => {
    if (browser) {
        window.localStorage.setItem('affirmations', JSON.stringify(val))
    }
})