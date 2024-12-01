import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    let menuItems = await fetch("/api/menuItems");
    return {
        menuItems: await menuItems.json(),
    };
};
