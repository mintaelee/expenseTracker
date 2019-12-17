import React, { useState, useEffect } from 'react'
import InputClass from '../../factory/Input/InputClass'
import ButtonClass from '../../factory/Button/ButtonClass'
import formArray from './CreateCategoryConfig'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { useAuth } from '../../hooks/queries/useAuth'
import { useCategory } from '../../hooks/queries/useCategory'
import { useCategoryActions } from '../../hooks/commands/useCategoryActions'

const initialCategoryData = {
    formData: {
        name: ''
    },
    submitted: false
}

export default function CreateCategory() {
    const [ categoryData, setCategoryData ] = useState(initialCategoryData)
    const { createCategory } = useCategoryActions()
    const { user } = useAuth()
    const { userCategories } = useCategory()


    const { submitted } = categoryData


    const successfullyCreatedCategory = () => {
        setCategoryData({
            submitted: false,
            formData: {
                name: ''
            },
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        setCategoryData({
            submitted: true
        })

        let newUserObj = Object.assign({}, categoryData.formData)
        newUserObj.id = user.id

        createCategory(newUserObj)
        successfullyCreatedCategory()
    }

    const handleInputChange = (event) => {
        const { formData } = categoryData
        formData[event.target.name] = event.target.value
        setCategoryData({
            ...categoryData,
            formData
        })
    }

    let form = (
        formArray.map((field) => {
            return (
                <div key={field.input.label}>
                    <InputClass 
                        {...field}
                        {...categoryData.formData}
                        handleInputChange={handleInputChange}
                    />
                </div>
            )
        })
    )

    useEffect(() => {
    
        ValidatorForm.addValidationRule('isCategoryNotDuplicate', (value) => {
            let categoryNames = userCategories.map(category => category.name.toLowerCase())
            let check = value.toLowerCase()
            if (categoryNames.includes(check)){
                return false
            }
            return true
        })
    }, [userCategories])

    return (
        <>
            <ValidatorForm
                className='Form'
                onSubmit={handleSubmit}
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
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </ButtonClass>
            </ValidatorForm>
        </>
    )
}
