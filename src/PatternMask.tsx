import React from 'react';
import { IMaskInput } from 'react-imask';

const ContractNumberMask = '+{00}(0000)00-0000';
const EmailAddressMask = /^\X*@?\S*$/;

const PatternMask = () => {
  // When you enter 112222334444 in Phone Mask, it will become: +11(2222)33-4444
  return (
    <div className='container mt-5'>
      <form action=''>
        <div className='mb-3'>
          <label htmlFor='' className='mb-1'>
            Phone Mask:
          </label>
          <IMaskInput
            className='form-control'
            mask={ContractNumberMask}
            placeholder='+21(6951)46-6542'
            onAccept={(value, mask) => console.log(value, mask)}
            value=''
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='' className='mb-1'>
            Range Number Mask:
          </label>
          <IMaskInput
            className='form-control'
            mask={Number}
            placeholder='Number 80 - 1000'
            min={80}
            max={1000}
            onAccept={(value, mask) => console.log(value, mask)}
            value=''
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='' className='mb-1'>
            Date Mask:
          </label>
          <IMaskInput
            className='form-control'
            mask={Date}
            placeholder='Date'
            min={new Date(2015, 0, 1)}
            max={new Date(2022, 0, 1)}
            onAccept={(value, mask) => console.log(value, mask)}
          />
        </div>
      </form>
    </div>
  );
};

export default PatternMask;
