import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Input } from '@mui/material';
import { Input as AntdInput } from 'antd';

import './styles.css';
import Select from 'react-select';

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}

export const Form1 = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    // alert(JSON.stringify(data));
    console.log('data=', data);
  };

  console.log('control=', control);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '600px' }}>
      <label>First Name</label>
      <Controller
        render={({ field }) => <Input {...field} className='materialUIInput' />}
        name='firstName'
        control={control}
        defaultValue=''
      />
      <label>First Name</label>
      <Controller
        render={({ field }) => <AntdInput {...field} />}
        name='lastName'
        control={control}
        defaultValue=''
      />
      <label>Ice Cream Preference</label>
      <Controller
        name='iceCreamType'
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          />
        )}
        control={control}
        defaultValue=''
      />

      <div
        style={{
          background: 'gray',
          display: 'flex',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <label>Checkbox</label>
        <Controller
          name='Checkbox'
          control={control}
          render={({ field }) => <Checkbox {...field} />}
        />
      </div>

      <input type='submit' />
    </form>
  );
};
