const formArray = [
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
                width: '300px',
            },
            validators: ['required'],
            errorMessages: ['this field is required']
          }
    }
  ];
  
  export default formArray; 