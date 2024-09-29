import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, MenuItem, Select } from '@mui/material';

const defaultValues = {
  select: '',
  input: '',
};

export const Form3 = () => {
  const { register, handleSubmit, setValue, reset, watch, getValues } = useForm(
    {
      defaultValues,
    },
  );
  const selectValue = watch('select');
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    register('select');
  }, [register]);

  const handleChange = (e) => {
    setValue('select', e.target.value, true);
  };

  console.log('getValues()=', getValues());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          background: 'white',
          paddingBlock: '30px',
        }}
      >
        <Select value={selectValue} onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <br />
        <br />
        <Input {...register('input')} />
      </div>

      <button type='button' onClick={() => reset({ ...defaultValues })}>
        Reset
      </button>
      <input type='submit' />
    </form>
  );
};
