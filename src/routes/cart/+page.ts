import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    let popularToday = await fetch("/api/popularToday");
    return {
        popularToday: await popularToday.json(),
    };
};
