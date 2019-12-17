import React, { useEffect, useState } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Modal, makeStyles, Table } from '@material-ui/core'
import formArray from './eventModalConfig'
import EventModalTable from './EventModalTable'
import InputClass from '../../factory/Input/InputClass'
import ButtonClass from '../../factory/Button/ButtonClass'
import { useModal } from '../../hooks/queries/useModal'
import { useModalActions } from '../../hooks/commands/useModalActions'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCalendarActions } from '../../hooks/commands/useCalendarActions'

const initialFormDataState = {
    formData: {
        expenseName: '',
        amount: 0,
        category: '',
        date: '',
        transactionType: ''
    },
    expenses: [],
    displayData: false,
    submitted: false
}

function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    modal: {
      position: 'absolute',
      width: '60%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
        textAlign: 'center'
    }
  }));

export default function EventModal() {
    
    const classes = useStyles()

    const { user } = useAuth()
    const { expenseModalVisible, date } = useModal()
    const { toggleExpenseModalFalse } = useModalActions()
    const { createExpense } = useCalendarActions()
    const [ dataState, setDataState ] = useState(initialFormDataState)
    const [ modalStyle ] = React.useState(getModalStyle)
    const { submitted } = dataState
    
    const handleInputChange = (event) => {
        const { formData } = dataState
        formData[event.target.name] = event.target.value
        setDataState({
            ...dataState,
            formData
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        const { formData } = dataState
        formData.date = date

        setDataState({
            submitted: true,
            formData
        })

        let newExpenseObj = Object.assign({}, formData)
        newExpenseObj.id = user.id

        createExpense(newExpenseObj)

        setDataState({
            submitted: false,
            formData: {
                expenseName: '',
                amount: 0,
                category: '',
                date: '',
                transactionType: ''
            }
        })
        toggleExpenseModalFalse()
    }

    const handleCloseExpenseModal = () => {
        toggleExpenseModalFalse()
    }

    let form = (
        formArray.map((field) => {
            return(
                <div key={field.input.label}>
                    <InputClass
                        handleInputChange={handleInputChange}
                        {...field}
                        {...dataState.formData}
                    />
                </div>
            )
        })
    )
                
    return (
        <> 
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={expenseModalVisible}
                onClose={handleCloseExpenseModal}
            >
                <div
                    className={classes.modal}
                    style={modalStyle}
                >
                    <EventModalTable />
                    <ValidatorForm
                        className={classes.form}
                        onSubmit={handleFormSubmit}
                    >
                        {
                            submitted ? 'Submitting...' : form
                        }
                        <br />
                        <ButtonClass
                            color='primary'
                            variant='contained'
                            type='submit'
                            disabled={submitted}
                        >
                            {
                                (submitted && 'Your form is submitted')
                                || (!submitted && 'Submit')
                            }
                        </ButtonClass>
                    </ValidatorForm>
                </div>
            </Modal>
        </>
    )
}
