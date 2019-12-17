const formArray = [
    {
      input: {
        type: 'text',
        name: 'expenseName',
        id: 'input-expenseName',
        label: 'Expense Name',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    },
    {
      input: {
        type: 'number',
        name: 'amount',
        id: 'input-amount',
        label: 'Amount',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
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
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    },
    {
      input: {
        type: 'text',
        name: 'transactionType',
        id: 'input-transactionType',
        label: 'Transaction Type',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    },

  ];
  
  export default formArray; 