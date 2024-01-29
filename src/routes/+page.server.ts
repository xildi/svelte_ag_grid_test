import type {PageServerLoad} from "./$types";
import input_list from '$lib/static/input.json';

export const load = (({ params, locals }) => {
	
	return {
		input_list,
	};
}) satisfies PageServerLoad;