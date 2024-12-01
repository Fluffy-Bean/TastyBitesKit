import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import TestData from "$lib/test-data";

export const GET: RequestHandler = async ({}) => {
    return json(TestData, {});
}
