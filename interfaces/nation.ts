export interface INationSummary {
    nation_id: number,
    nation_name: string,
    nation_code: string,
    total_tour: number,
    url_media: string
}

export interface INationFilter{
    nation_name: string
}