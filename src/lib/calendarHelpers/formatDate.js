export function getDaysInMonth(year, month){
    return (new Date(year, month, 0)).getDate()
}
export function getDayPosition(year, month, day){
    return (new Date(year, month-1, day)).getDay()
}
export function checkDate(e){
    return dateToString(new Date)===dateToString(e)
}
export function dateToString(date){
    let month = date.getMonth() + 1
    return ((month < 10 ? '0'+month : month)+"/"+(date.getDate() < 10 ? '0'+date.getDate() : date.getDate())+"/"+date.getFullYear())
}

export function numberToString(number){
    return number < 10 ? `0${number}` : number
}

export function getStartAndEndDates(year, month){
    let startDay = new Date(year, month-1).getDay()
    let start = getDaysInMonth(year, month-1) - (startDay) || 1
    let startMonth = month === 1 ? 12 : month - 1
    let startYear = month === 1 ? year - 1 : year
    let startDate = new Date(startYear, startMonth-1, start+1)
    let endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 41)
    return {startDate, endDate}
}

export function getWeekDates(currentDate){
    let dateFormatted = new Date(currentDate)
    let month = dateFormatted.getMonth()
    let year = dateFormatted.getFullYear()
    let date = dateFormatted.getDate()
    let day = dateFormatted.getDay()
    let weekStart = new Date(year, month, date - day)
    let weekEnd = new Date(year, month, date + (6 - day))
    return {weekStart, weekEnd}
}