import type { PageLoad } from "./$types";
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
    let uuid: string = params.uuid;

    if (!uuid) return error(404, "uuid not found");

    let menuItem = await fetch(`/api/menuItems/${uuid}`, {});
    let popularToday = await fetch("/api/popularToday");

    return {
        menuItem: await menuItem.json(),
        popularToday: await popularToday.json(),
    };
};
