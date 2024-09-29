import React from 'react';
import { useController, UseControllerProps, useForm } from 'react-hook-form';

type FormValues = {
  FirstName: string;
};

let renderCount = 0;

function Input(props: UseControllerProps) {
  const { field, fieldState } = useController(props);
  console.log('Form2 Input field = ', field);
  console.log('Form2 Input fieldState = ', fieldState);

  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p style={{ color: 'white' }}>{fieldState.isTouched && 'Touched'}</p>
      <p style={{ color: 'white' }}>{fieldState.isDirty && 'Dirty'}</p>
      <p style={{ color: 'white' }}>
        {fieldState.invalid ? 'invalid' : 'valid'}
      </p>
    </div>
  );
}

// Using Hooks API
export const Form2 = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: '',
    },
    mode: 'onChange',
  });
  const onSubmit = (data: FormValues) => console.log(data);
  renderCount++;

  return (
    <div>
      {/*<Headers*/}
      {/*  renderCount={renderCount}*/}
      {/*  description='Performant, flexible and extensible forms with easy-to-use validation.'*/}
      {/*/>*/}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name='FirstName' rules={{ required: true }} />
        <input type='submit' />
      </form>
    </div>
  );
};
