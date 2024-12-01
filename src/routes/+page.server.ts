import type { PageServerLoad } from "./$types";
import { getPopularToday } from "$lib/test-api";

export const load: PageServerLoad = async ({}) => {
    const popularToday = await getPopularToday();

    return {
        popularToday: popularToday,
    };
};
