import { useDispatch } from 'react-redux'
import { setDate, setWeekDate, setSelectedDate, decreaseMonth, increaseMonth, decreaseWeek, increaseWeek } from '../../store/actions/date'
import { getStartAndEndDates, getWeekDates } from '../../lib/calendarHelpers/formatDate'

export function useDateActions() {
    const dispatch = useDispatch()

    const getCurrentDate = () => {
        let current = new Date()
        let currentYear = current.getFullYear()
        let currentMonth = current.getMonth() + 1

        let { startDate, endDate } = getStartAndEndDates(currentYear, currentMonth)
        let { weekStart, weekEnd } = getWeekDates(current)

        let dateObj = {
            year: currentYear,
            month: currentMonth,
            currentDate: current,
            startDate,
            endDate,
            weekStart,
            weekEnd
        }

        dispatch(
            setDate({
                date: dateObj,
                trigger: "Setting date to current date"
            })
        )
    }

    const toggleMonth = (month, year) => {
        let { startDate, endDate } = getStartAndEndDates(year, month)
        dispatch(
            setSelectedDate({
                startDate,
                endDate
            })
        )
    }

    const toggleWeek = (currentDate, month, year) => {
        let current = new Date(currentDate)
        let date = new Date(year, month-1)
        if (current.getMonth()+1 === month){
            date = current
        }
        let { weekStart, weekEnd } = getWeekDates(date)

        dispatch(
            setWeekDate({
                weekStart,
                weekEnd
            })
        )
    }

    const setStartAndEndDate = (startDate, endDate) => {
        
        dispatch(setSelectedDate({
            startDate, endDate
        }))
    }

    const decreaseMonthByOne = ({month, year}) => {
        if (month === 1){
            month = 12
            year--
        } else {
            month--
        }
        const { startDate, endDate } = getStartAndEndDates(year, month)

        dispatch(
            decreaseMonth({
                month,
                year,
                startDate,
                endDate
            })
        )
    }
    const increaseMonthByOne = ({month, year}) => {
        if (month === 12){
            month = 1
            year++
        } else {
            month++
        }

        const { startDate, endDate } = getStartAndEndDates(year, month)


        dispatch(
            increaseMonth({
                month,
                year,
                startDate,
                endDate
            })
        )
    }
    const decreaseWeekByOne = (currentDate, startDate, endDate) => {
        let current = new Date(currentDate)
        let month = current.getMonth()
        let year = current.getFullYear()
        let date = current.getDate()
        let decreasedDate = new Date(year, month, date-7)
        let { weekStart, weekEnd } = getWeekDates(decreasedDate)
        if (weekStart < startDate){
            startDate = weekStart
        }
        let newMonth = weekStart.getMonth() + 1
        let newYear = weekStart.getFullYear()
        dispatch(
            decreaseWeek({
                newMonth,
                newYear,
                startDate,
                endDate,
                weekStart,
                weekEnd
            })
        )

    }
    const increaseWeekByOne = (currentDate, startDate, endDate) => {
        let current = new Date(currentDate)
        let month = current.getMonth()
        let year = current.getFullYear()
        let date = current.getDate()
        let increasedDate = new Date(year, month, date+7)
        let { weekStart, weekEnd } = getWeekDates(increasedDate)
        if (weekEnd > endDate){
            endDate = weekEnd
        }
        let newMonth = weekStart.getMonth() + 1
        let newYear = weekStart.getFullYear()
        dispatch(
            increaseWeek({
                newMonth,
                newYear,
                startDate,
                endDate,
                weekStart,
                weekEnd
            })
        )

    }


    return { getCurrentDate, toggleMonth, toggleWeek, setStartAndEndDate, decreaseMonthByOne, increaseMonthByOne, decreaseWeekByOne, increaseWeekByOne }
}