export type Location = {
    id: number,
    name: string,
    code: string,
}

export type Store = {
    id: number,
    name: string,
    slug: string,
    description?: string,
    phone?: string,
    address?: string,
    email?: string,
    website?: string,
    logo?: string,
    location_id: number,
    location: Location,
}