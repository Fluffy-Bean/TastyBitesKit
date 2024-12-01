import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
    const popularToday = await fetch("/api/popularToday");

    return {
        popularToday: await popularToday.json(),
    };
};
