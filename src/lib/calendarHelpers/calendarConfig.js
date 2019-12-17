import { dateToString } from './formatDate'

export const contentArray = (startDate, endDate, month, year) => {
    let calendarContent = []
    let currentDate = new Date(startDate)
    let week = []
    for (let c = 0; c < 48; c++){
        if (c !== 0 && (c+1)%8 === 0){
            calendarContent.push({content: 'Summary', count: c, week: week})
            week = []
        } else {
            let nextDate = new Date(currentDate)
            let current = false
            if (nextDate.getMonth()+1 === month){
                current = true
            }
            calendarContent.push({content: nextDate, count: c, current})
            week.push(dateToString(nextDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
    }
    return calendarContent
}

export const weekContentArray = (weekStart, weekEnd, month, year) => {
    let calendarContent = []
    let currentDate = new Date(weekStart)
    let week = []
    for (let c = 0; c < 9; c++){
        if (c === 0){
            calendarContent.push({contentType: 'Category', count: c, week: week})
        } else if (c === 8){
            calendarContent.push({contentType: 'Summary', count: c, week: week})
        } else {
            let nextDate = new Date(currentDate)
            let current = false
            if (nextDate.getMonth()+1 === month){
                current = true
            }
            calendarContent.push({contentType: 'Value', content: nextDate, count: c, current})
            week.push(dateToString(nextDate))
            currentDate.setDate(currentDate.getDate() + 1)
        }
    }
    return calendarContent
}