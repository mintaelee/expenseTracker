import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { ValidatorForm } from 'react-material-ui-form-validator'
import { makeStyles, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import CSVReader from 'react-csv-reader'
import InputClass from '../../factory/Input/InputClass'
import ButtonClass from '../../factory/Button/ButtonClass'
import formArray from './UploadFileConfig'
import { parseData } from './UploadFileHelper'
import { useAuth } from '../../hooks/queries/useAuth'
import { useFileActions } from '../../hooks/commands/useFileActions'
import { useCategory } from '../../hooks/queries/useCategory'
import ErrorTable from './ErrorTable'
import './File.css'
import SuccessTable from './SuccessTable';
import EditTable from './EditTable';


const initialBankData = {
    formData: {
        name: ''
    },
    currentTab: 0,
    fileData: [],
    uncategorizedData: [],
    submitted: false,
    displayData: false
}

const useStyles = makeStyles(theme => ({
    contentContainer: {
        width: '100%',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        textAlign: 'center',
    },
    tableTabs: {
        width: '80%',
        position: 'relative',
        marginTop: '150px'
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function UploadFile() {
    const classes = useStyles()
    const [ bankData, setBankData ] = useState(initialBankData)
    const { submitted } = bankData
    const { user } = useAuth()
    const { userCategories } = useCategory()
    const { uploadFile } = useFileActions()
    let parsedData = []

    const handleFile = (data) => {
        parsedData = parseData(data, bankData.formData.name)
        let userCategoryNames = userCategories.map(category => category.name)
        let uncategorized = parsedData.filter(transaction => userCategoryNames.indexOf(transaction.category) === -1)
        setBankData({
            ...bankData,
            fileData: parsedData,
            uncategorizedData: uncategorized,
        })
    }

    const successfullyUploadedFile = () => {
        setBankData({
            ...bankData,
            submitted: false,
            formData: {
                name: ''
            },
            displayData: true
        })
    }

    const handleInputChange = (event) => {
        const { formData } = bankData
        formData[event.target.name] = event.target.value
        setBankData({
            ...bankData,
            formData
        })
    }

    const handleTabChange = (event, newValue) => {
        setBankData({
            ...bankData,
            currentTab: newValue
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setBankData({
            submitted: true
        })

        let newFileObj = Object.assign({}, bankData.formData)

        newFileObj.id = user.id
        newFileObj.transactions = bankData.fileData

        uploadFile(newFileObj)

        successfullyUploadedFile()

    }

    let form = (
        formArray.map((field) => {
            return (
                <div key={field.input.label}>
                    <InputClass 
                        {...field}
                        {...bankData.formData}
                        handleInputChange={handleInputChange}
                    />
                </div>
            )
        })
    )

    return (
        <>
            <div className={classes.contentContainer}>
                <CSVReader
                    cssClass='react-csv-input'
                    label="Upload your bank transactions in CSV Format"
                    onFileLoaded={handleFile}
                />
                <ValidatorForm
                    className={classes.form}
                    onSubmit={handleSubmit}
                    style={{marginTop:'-140px', height: '50px'}}
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
                        style={{top: '100px'}}
                    >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                    </ButtonClass>
                </ValidatorForm>
                <AppBar className={classes.tableTabs}>
                    <Tabs 
                        value={bankData.currentTab}
                        onChange={handleTabChange}
                        indicatorColor='primary'
                        textColor='inherit'
                        centered
                    >
                        <Tab label="Unsuccessful Uploads" {...a11yProps(0)} />
                        <Tab label="Uncategorized Uploads" {...a11yProps(1)} />
                        <Tab label="Successful Uploads" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={bankData.currentTab} index={0}>
                    <ErrorTable /> 
                </TabPanel>
                <TabPanel value={bankData.currentTab} index={1}>
                    <EditTable />
                </TabPanel>
                <TabPanel value={bankData.currentTab} index={2}>
                    <SuccessTable />
                </TabPanel>
            </div>
        </>
    )
}
