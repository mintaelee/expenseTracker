const formArray = [
    {
      input: {
        type: 'select-bank',
        name: 'name',
        id: 'input-bankname',
        label: 'Bank Name',
        value: ['Chase', 'Amex', 'Discover', 'BoA'],
        style: {
          width: '250px',
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    }
  ];
  
  export default formArray;