import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { ValidatorForm } from 'react-material-ui-form-validator'
import InputClass from '../../factory/Input/InputClass'
import ButtonClass from '../../factory/Button/ButtonClass'
import formArray from './SigninConfig'
import { useAuthActions } from '../../hooks/commands/useAuthActions'
import { useAuth } from '../../hooks/queries/useAuth'
import './Signin.css'

const intialSigninData = {
    formData: {
        email: '',
        password: ''
    },
    submitted: false,
}

function Signin(props) {

    const [ signinData, setSigninData ] = useState(intialSigninData)
    const { signinUser } = useAuthActions()
    const { submitted } = signinData
    const { isAuthenticated } = useAuth()

    const handleInputChange = (event) => {
        const { formData } = signinData
        formData[event.target.name] = event.target.value
        setSigninData({
            ...signinData,
            formData
        })
    }

    const successfullySignedIn = () => {
        setSigninData({
            submitted: false,
            formData: {
                email: '',
                password: ''
            }
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        setSigninData({
            submitted: true
        })
        signinUser(signinData.formData)
    }

    let form = (
        formArray.map((field) => {
            return (
                <div key={field.input.label}>
                    <InputClass
                        handleInputChange={handleInputChange}
                        {...field}
                        {...signinData.formData}
                    />
                </div>
            )
        })
    )

    useEffect(() => {
        if (submitted){
            if (isAuthenticated){
                successfullySignedIn()
                props.history.push('/calendar')
            } else {
                setSigninData({
                    submitted: false
                })
            }
        }
    }, [submitted])

    return (
        <>
            <ValidatorForm
                className='Form'
                onSubmit={handleFormSubmit}
            >
                {
                    submitted ? 'Loading...' : form
                }
                <br />
                <ButtonClass
                    color='primary'
                    variant='contained'
                    type='submit'
                    disable={submitted}
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

export default withRouter(Signin)
