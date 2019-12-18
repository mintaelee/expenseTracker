import React, { useState } from 'react';
import {TextField, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { useCategory } from '../../hooks/queries/useCategory'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const TableInput = (props) => {
  const { input } = props;
  const { userCategories } = useCategory()
  let dynamicInputField = null 


  const [selectedDate, handleDateChange] = useState(props.date);

  switch (input.type) {
  
    case('text'):
   
      dynamicInputField = <TextField 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props[input.name]}
                                onChange={props.handleInputChange}
                          />
      break;

    case('number'):
   
      dynamicInputField = <TextField 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props.amount}
                                onChange={props.handleInputChange}
                          />
      break;

    case('date'):
        dynamicInputField = <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="start-date"
                                    label="Select Start Date"
                                    value={selectedDate}
                                    onChange={date => {
                                        handleDateChange(date)
                                        return props.handleInputChange
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </ MuiPickersUtilsProvider>
        break;                   
     
    case('select'):

        dynamicInputField = <FormControl style={input.style}>
                              <InputLabel htmlFor="input-category" >{'Select category'}</InputLabel>
                              <Select
                                value={props.category}
                                onChange={props.handleInputChange}
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
                              </Select>
                              </FormControl>


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

export default TableInput