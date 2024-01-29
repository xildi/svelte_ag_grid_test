import type {PageServerLoad} from "./$types";
import input_list from '$lib/static/input.json';
import prisma from '$lib/prisma';
import { json, type RequestHandler } from "@sveltejs/kit";
//import input_list from '$lib/static/input2.json';

export async function GET({url}) {
    const rows = url.searchParams.get("rows");
	const response = await prisma.row.findMany({take: parseInt(rows)})
	return json(response);
	};