import React from 'react';
import {TextField, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { useCategory } from '../../hooks/queries/useCategory'

const InputClass = (props) => {
  const { input } = props;
  const { userCategories } = useCategory()
  let dynamicInputField = null 
  switch (input.type) {
    
    case('title'):
   
    dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type={input.type}
                              value={props.title}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                        />
    break;
  
    case('text'):
   
      dynamicInputField = <TextValidator 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props[input.name]}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                onChange={props.handleInputChange}
                          />
      break;

    case('number'):
   
      dynamicInputField = <TextValidator 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props.amount}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                onChange={props.handleInputChange}
                          />
      break;

    case('email'):
        dynamicInputField = <TextValidator 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props.email}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                onChange={props.handleInputChange}
                            />
        break;                   
      
    case('password'):
        dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type={input.type}
                              value={props.password}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                            />
        break; 
    case('confirmPassword'):
        dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type='password'
                              value={props.confirmPassword}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                            />
        break;     
    case('select'):

        dynamicInputField = <FormControl style={input.style}>
                              <InputLabel htmlFor="input-category" style={{top: '-15px'}}>{props[input.name].length > 1 ? '' : 'Select category'}</InputLabel>
                              <SelectValidator
                                value={props[input.name] || ''}
                                onChange={props.handleInputChange}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                name={input.name}
                              >
                              {
                                userCategories.map(option => {
                                  return (
                                    <MenuItem key={option._id} value={option._id}>
                                      {option.name}
                                    </MenuItem>
                                  )
                              })}
                              </SelectValidator>
                              </FormControl>


      break;
    case('select-bank'):

      dynamicInputField = <FormControl style={input.style}>
                            <InputLabel htmlFor="input-category" style={{top: '-15px'}}>{props[input.name].length > 1 ? '' : 'Select category'}</InputLabel>
                            <SelectValidator
                              value={props[input.name] || ''}
                              onChange={props.handleInputChange}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              name={input.name}
                            >
                            {
                              input.value.map(option => {
                                return (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                )
                            })}
                            </SelectValidator>
                            </FormControl>


    break;
    case('multiline'):
                 
      dynamicInputField = <TextField 
                            id={input.id}
                            label={input.label}
                            required={input.required}
                            style={input.style}
                            name={input.name}
                            type={input.name}
                            onChange={props.handleInputChange}
                            rows={input.rows}
                            multiline={input.multiline}
                          />

      break;

    default: 
      return null;
  }



  return (
    <>
      {dynamicInputField}
    </>
  )
}

export default InputClass