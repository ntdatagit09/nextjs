export const formatDate = (date_time: string | Date, $type: string) => {
    const dateTimeToFormat = new Date(date_time);
    const dayParse = dateTimeToFormat.getDate();
    let day = dayParse < 10 ? '0' + dayParse : dayParse;
    const monthParse = dateTimeToFormat.getMonth() + 1;
    let month = monthParse < 10 ? '0' + monthParse : monthParse;

    switch ($type) {
        case 'yyyy-mm-dd': {
            let year = dateTimeToFormat.getFullYear();
            return year + '-' + month + '-' + day;
        } break;
        default: {
            let year = dateTimeToFormat.getFullYear();
            return day + '/' + month + '/' + year;
        } break;
    }
}