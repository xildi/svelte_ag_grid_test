import type {PageServerLoad} from "./$types";
import input_list from '$lib/static/input.json';
import prisma from "$lib/prisma";
//import input_list from '$lib/static/input2.json';

export const load = (async () => {
	const response = await prisma.row.findMany({take: 100})
	const max_value = await prisma.row.aggregate({
		_max: {
			total_winnings: true
		}
	})
	return {
		input_list: response,
		max_winnings: max_value,
	};
}) satisfies PageServerLoad;