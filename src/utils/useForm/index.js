import { useState } from 'react';

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState)
  return [
    values, 
    (formType, formValue) => {
      if (formType === 'reset') {
        return setValues(initialState)
      }
      return setValues({...values, [formType]: formValue})
    }
  ]
}