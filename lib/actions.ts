"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify'
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if (!session)
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        })

    // const { title, description, category, link } = Object.fromEntries(
    const data = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== pitch)
    )

    const slug = slugify(data.title as string, { lower: true, strict: true })

    try {
        const startup = {
            title: data.title,
            description: data.description,
            category: data.category,
            views: 0,
            image: data.link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch
        }

        const result = await writeClient.create({ _type: 'startup', ...startup })

        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS",
        })
    } catch (error) {

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
            data: data
        })
    }
}