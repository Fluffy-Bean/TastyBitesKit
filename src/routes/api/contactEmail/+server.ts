import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const form = await request.formData();
    console.log(form);
    return json({});
}
