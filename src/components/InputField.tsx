import React from 'react'
import { Control } from 'react-hook-form'
import { FormField } from './ui/form'

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number'
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>,
  name: string,
  fieldType: InputType | InputType.TEXT,
  className?: string
}


function Field(props: InputFieldProps) {
    switch (props.fieldType) {
        case InputType.TEXT:
            return <></>
        default:
            return <></>
    }
}


const InputField = ({control, name, fieldType, placeholder, className}: InputFieldProps) => {
  return (
    <FormField
        control={control}
        name='email'
        render={({ field }) => {
          return <Field fieldType={fieldType} name={name} placeholder={placeholder} control={control} />
        }}
    />
    
  )
}

export default InputField