import slugify from "slugify";

export function transferStringToSlug(value: string|null)
{
    if(value == null){
        return '';
    }
    return slugify(value.toLocaleLowerCase(), {
        replacement: '-',
        locale: 'vi',
        trim: true,
        remove: /[*+~.()'"!:@]/g
    })
}