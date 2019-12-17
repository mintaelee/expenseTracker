import React, { useEffect, useState } from 'react'
import PieChart from 'react-minimal-pie-chart'
import SummaryTable from './SummaryTable'
import { makeStyles, Card, CardContent, Typography } from '@material-ui/core'
import { useCalendar } from '../../hooks/queries/useCalendar'
import { useCategory } from '../../hooks/queries/useCategory'
import { categoryColors } from '../../lib/calendarHelpers/constants'

const DEFAULT_WIDTH = 10
const HOVER_WIDTH = 12

const initialChartData = {
    displayData: [],
    hoverData: {
        title: '',
        value: 0,
        color: ''
    }
}

const useStyles = makeStyles({
    summaryContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // height: 'calc(100% - 152px)',
        width: '100%'
    },
    tableContainer: {
        width: '50%',
    },
    chartContainer: {
        // minWidth: '650px',
        // maxWidth: '700px',
        width: '50%',
        zIndex: '10',
    }
})



export default function Chart({handleMouseOver, handleMouseOut, handleChartClick}) {
    
    const classes = useStyles()
    const [ chartData, setChartData ] = useState(initialChartData)
    let { displayData, hoverData } = chartData
    const { expenses } = useCalendar()
    const { userCategories } = useCategory()

    const mouseOver = (event, data, index) => {
        const newData = data.map((entry, i) => {
            return {
                ...entry,
                ...{
                    style: {
                        ...entry.style,
                        strokeWidth: i === index ? HOVER_WIDTH : DEFAULT_WIDTH,
                        backgroundColor: i === index ? '#EDEDED' : ''
                    }
                }
            }
        })
        setChartData({
            ...chartData,
            displayData: newData
        })
        handleMouseOver(data, index)
    }

    const mouseOut = (event, data, index) => {
        const newData = data.map((entry, i) => {
            return {
                ...entry,
                ...{
                    style: {
                        ...entry.style,
                        strokeWidth: 10,
                        backgroundColor: ''
                    }
                }
            }
        })
        setChartData({
            ...chartData,
            displayData: newData
        })
        handleMouseOut(data, index)
    }

    const chartMouseOver = (index) => {
        const newData = displayData.map((entry, i) => {
            return {
                ...entry,
                ...{
                    style: {
                        ...entry.style,
                        strokeWidth: i === index ? HOVER_WIDTH : DEFAULT_WIDTH,
                        backgroundColor: i === index ? '#EDEDED' : ''
                    }
                }
            }
        })
        setChartData({
            ...chartData,
            displayData: newData
        })
        handleMouseOver(displayData, index)
    }

    const chartMouseOut = (index) => {
        const newData = displayData.map((entry, i) => {
            return {
                ...entry,
                ...{
                    style: {
                        ...entry.style,
                        strokeWidth: 10,
                        backgroundColor: ''
                    }
                }
            }
        })
        setChartData({
            ...chartData,
            displayData: newData
        })
        handleMouseOut(displayData, index)
    }

    const chartOnClick = (index) => {
        const clickedCategory = displayData.filter(data => data.index === index)
        handleChartClick(clickedCategory[0].id)
    }

    useEffect(() => {
        const data = userCategories.map((category,i) => {
            let matchingExpenses = expenses.filter(expense => expense.category_id === category._id)
            let categoryValue = matchingExpenses.reduce(((acc, curr) => acc + curr.amount), 0)
            let color = categoryColors[category.name] || '#b84242'

            let data = {
                index: i,
                color: color,
                title: category.name,
                id: category._id,
                value: categoryValue,
                style: {
                    strokeWidth: DEFAULT_WIDTH
                }
            }
            return data
        })

        setChartData({
            ...chartData,
            displayData: data
        })

    }, [expenses])
    
    return (
        <div className={classes.summaryContainer}>
            <div className={classes.tableContainer}>
                <SummaryTable chartMouseOver={chartMouseOver} chartMouseOut={chartMouseOut} chartOnClick={chartOnClick} data={displayData}/>
            </div>
            <div className={classes.chartContainer}>    
                <PieChart
                    animate
                    animationDuration={500}
                    animationEasing='ease-out'
                    cx={50}
                    cy={30}
                    data={displayData}
                    // label={({ data, dataIndex }) => {
                    //     let percentage = Math.round(data[dataIndex].percentage)
                    //     if (percentage > 0){
                    //         return percentage + '%'
                    //     }
                    // }}
                    labelPosition={75}
                    // labelStyle={{
                    //     fill: 'black',
                    //     fontSize: '1.5px'
                    // }}
                    lengthAngle={360}
                    lineWidth={20}
                    onClick={undefined}
                    onMouseOut={mouseOut}
                    onMouseOver={mouseOver}
                    paddingAngle={0}
                    radius={25}
                    ratio={1}
                    rounded={false}
                    startAngle={0}
                />
            </div>
        </div>
    )
}
