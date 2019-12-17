const formArray = [
    {
      input: {
        type: 'text',
        name: 'name',
        id: 'input-name',
        label: 'Name',
        style: {
            padding: '0px',
            marginTop: '5px'
        },
      }
    },
    {
      input: {
        type: 'date',
        name: 'date',
        id: 'input-date',
        label: 'Date',
        style: {
            padding: '0px',
            marginTop: '5px'
        },
      }
    },
    {
      input: {
        type: 'number',
        name: 'amount',
        id: 'input-amount',
        label: 'Amount',
        style: {
            padding: '0px',
            marginTop: '5px'
        },
      }
    },
    {
        input: {
            type: 'select',
            name: 'category',
            id: 'input-category',
            label: 'Select',
            select: true,
            required: true,
            helperText: 'Select category',
            style: {
                padding: '0px',
                marginTop: '15px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
          }
    }
  ];
  
  export default formArray; 