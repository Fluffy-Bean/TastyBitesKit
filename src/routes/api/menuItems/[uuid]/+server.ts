import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

import type { Item } from "$lib/types";
import TestData from "$lib/test-data";

export const GET: RequestHandler = async ({ params }) => {
    let data: Item | undefined;

    TestData.forEach((item: Item) => {
        if (item.uuid === params.uuid.trim()) {
            data = item;
            return;
        }
    });

    if (!data) return error(404, `could not find item "${ params.uuid }"`);
    else return json(data, {});
}
