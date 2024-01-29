import type {PageServerLoad} from "./$types";
import input_list from '$lib/static/input.json';
//import input_list from '$lib/static/input2.json';

export const load = (({ params, locals }) => {
	
	return {
		input_list,
	};
}) satisfies PageServerLoad;