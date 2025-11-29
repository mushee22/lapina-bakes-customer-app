
export type Category = {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    description?: string;
}

export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_urls?: string[];
    price: number;
    stock: number;
    gst?: number;
    selling_price: number;
    category_id: number;
    discount_percentage?: number;
    price_with_gst?: number;
    is_available: boolean;
    main_image_url?: string;
}