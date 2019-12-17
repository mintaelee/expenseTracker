const formArray = [
    {
      input: {
        type: 'text',
        name: 'name',
        id: 'input-name',
        label: 'Name',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required', 'isCategoryNotDuplicate'],
        errorMessages: ['this field is required', 'this category already exists']
      }
    }
  ];
  
  export default formArray;