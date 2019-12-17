import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { ValidatorForm } from 'react-material-ui-form-validator'
import InputClass from '../../factory/Input/InputClass'
import ButtonClass from '../../factory/Button/ButtonClass'
import MessageBar from '../../factory/MessageBar/MessageBar'
import formArray from './SignupConfig'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { useAuth } from '../../hooks/queries/useAuth'
import './Signup.css'

const intialSignupData = {
    formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    submitted: false,
    redirectToggle: false,
    countdownSecond: 3
}

function Signup(props) {

    const [ signupData, setSignupData ] = useState(intialSignupData)
    const { signupUser } = useAuthActions()
    const { submitted } = signupData
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { formData } = signupData
            if (value !== formData.password){
                return false
            }
            return true
        })
    }, [])

    const handleInputChange = (event) => {
        const { formData } = signupData
        formData[event.target.name] = event.target.value
        setSignupData({
            ...signupData,
            formData
        })
    }

    const successfullySignedUp = () => {
        setSignupData({
            submitted: false,
            formData: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        })
    }

    const countdownRedirect = () => {
        let count = 3
        let countdownTimer = setInterval(function () {
            count -= 1
            setSignupData({
                countdownSecond: count
            })
            if (count === 0){
                clearInterval(countdownTimer)
                props.history.push('/calendar')
            }
        }.bind(this), 1000)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

        setSignupData({
            submitted: true
        })
        signupUser(signupData.formData)
            // .then(() => {
            //     successfullySignedUp()
            //     setSignupData({
            //         redirectToggle: true
            //     })
            //     countdownRedirect()
            // })
            // .catch(error => {
            //     setSignupData({
            //         submitted: false
            //     })
            // })
    }

    useEffect(() => {
        if (submitted){
            if (isAuthenticated){
                successfullySignedUp()
                setSignupData({
                    redirectToggle: true
                })
                countdownRedirect()
                props.history.push('/calendar')
            } else {
                setSignupData({
                    submitted: false
                })
            }
        }
    }, [submitted])

    let form = (
        formArray.map((field) => {
            return(
                <div key={field.input.label}>
                    <InputClass
                        handleInputChange={handleInputChange}
                        {...field}
                        {...signupData.formData}
                    />
                </div>
            )
        })
    )


    return (
        <>
            <ValidatorForm
                className='Form'
                onSubmit={handleFormSubmit}
            >
                {
                    submitted ? 'Submitted...' : form
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
        </>
    )
}

export default withRouter(Signup)