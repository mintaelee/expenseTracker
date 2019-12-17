import 'date-fns';
import React, { useState, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator'
import { makeStyles, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ButtonClass from '../../factory/Button/ButtonClass'
import { useDate } from '../../hooks/queries/useDate'
import { useDateActions } from '../../hooks/commands/useDateActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCalendarActions } from '../../hooks/commands/useCalendarActions'

const useStyles = makeStyles({
    button: {
        marginTop: '20px',
        marginBottom: '8px'
    }
})

export default function DatePicker() {
    const classes = useStyles()
    const { date } = useDate()
    const { startDate, endDate } = date
    const [ dateData, setDateData ] = useState({startDate, endDate})
    const { setStartAndEndDate } = useDateActions()
    const { user } = useAuth()
    const { getExpenses } = useCalendarActions()
    

    const handleStartDateChange = date => {
        setDateData({
            ...dateData,
            startDate: date
        })
    }

    const handleEndDateChange = date => {
        setDateData({
            ...dateData,
            endDate: date
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        let start = new Date(dateData.startDate)
        let end = new Date(dateData.endDate)

        let calendarObj = {
            id: user.id,
            startDate: start,
            endDate: end
        }

        setStartAndEndDate(dateData.startDate, dateData.endDate)
        getExpenses(calendarObj)
    }

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="start-date"
                        label="Select Start Date"
                        value={dateData.startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="end-date"
                        label="Select End Date"
                        value={dateData.endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <ValidatorForm
                        className={classes.button}
                        onSubmit={handleFormSubmit}
                    >
                        <ButtonClass
                            color='primary'
                            variant='contained'
                            type='submit'
                        >
                            {'Submit'}
                        </ButtonClass>
                    </ValidatorForm>
                </Grid>
            </MuiPickersUtilsProvider>
        </>
    );
}