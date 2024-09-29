import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Input, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

function PhoneInput(props) {
  return (
    <InputMask
      mask='(+1) 999 999 9999'
      value={props.value}
      onChange={props.onChange}
    ></InputMask>
  );
}

function PINInput(props) {
  return (
    <InputMask
      mask='9999'
      value={props.value}
      onChange={props.onChange}
      placeholder='Enter PIN'
    ></InputMask>
  );
}

function GoogleOTP(props) {
  return (
    <InputMask
      mask='G-999999'
      maskChar={null}
      value={props.value}
      onChange={props.onChange}
    ></InputMask>
  );
}

function CreditCardInput(props) {
  return (
    <InputMask
      mask='9999 9999 9999 9999'
      value={props.value}
      onChange={props.onChange}
    ></InputMask>
  );
}

function DateInput(props) {
  return (
    <InputMask
      mask='9999-99-99'
      placeholder='YYYY-MM-DD'
      value={props.value}
      onChange={props.onChange}
    ></InputMask>
  );
}

/*
A better one:

The month part accepts only 0 and 1 for the first digit.
If the user entered 0, the second digit position allows any digit between 1 and 9.
If the user entered 1, the user can only enter digits between 0 and 2 for the second digit’s location

The date part accepts digits based on the last day of the user-entered month.
For example, if the user entered 2022-02, the masked input accepts only integers from 01 to 28 for the date part, since 2022 February’s last day is 28
* */

function Date2Input(props) {
  let mask = 'YYYY-mM-dD';
  let formatChars = {
    Y: '[0-9]',
    m: '[0-1]',
    M: '[0-9]',
    d: '[0-3]',
    D: '[1-9]',
  };

  let beforeMaskedValueChange2 = (newState, oldState, userInput) => {
    let { value } = newState;
    console.log('value2=', value);

    let dateParts = value.split('-');
    console.log('dateParts2=', dateParts);

    let yearPart = dateParts[0];
    let monthPart = dateParts[1];
    let dayPart = dateParts[2];

    // Conditional mask for the 2nd digit of month based on the first digit
    if (monthPart.startsWith('1'))
      formatChars['M'] = '[0-2]'; // To block 13, 15, etc.
    else formatChars['M'] = '[1-9]'; // To allow 05, 08, etc - but blocking 00.

    // Conditional mask for day
    if (!yearPart.includes('_') && !monthPart.includes('_')) {
      // Find last day of the month
      const endOfMonth = new Date(`${yearPart}-01-01`);
      endOfMonth.setMonth(parseInt(monthPart));
      endOfMonth.setDate(0);
      const lastDayOfMonth = endOfMonth.getDate().toString();

      // Set [0-x] dynamically for the first digit based of last day
      formatChars['d'] = `[0-${lastDayOfMonth[0]}]`;

      if (dayPart.startsWith(lastDayOfMonth[0]))
        formatChars['D'] = `[0-${lastDayOfMonth[1]}]`; // Limit month's last digit based on last day
      else if (dayPart.startsWith('0'))
        formatChars['D'] = '[1-9]'; // To block 00.
      else formatChars['D'] = '[0-9]'; // To allow days to start with 1 Eg: 10, 12, 15, etc.
    }

    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      mask={mask}
      placeholder='YYYY-MM-DD'
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange2}
    ></InputMask>
  );
}

/*
For the DD-MM-YYYY date format, we have to enter the date before the month. Therefore, we cannot implement a proper validation for date digits.

As a solution, we can simplify the validation logic by allowing an integer value up to 31 for the date part regardless of the month - assuming that the user knows the end date of a specific month. Look at the following DD-MM-YYYY formatted date mask validation.
*/
function Date3Input(props) {
  const mask = 'dD-mM-YYYY';
  const formatChars = {
    Y: '[0-9]',
    d: '[0-3]',
    D: '[0-9]',
    m: '[0-1]',
    M: '[1-9]',
  };

  let beforeMaskedValueChange3 = (newState, oldState, userInput) => {
    const { value } = newState;
    console.log('value3=', value);

    const dateParts = value.split('-');
    console.log('dateParts3=', dateParts);

    const dayPart = dateParts[0];
    const monthPart = dateParts[1];

    // Conditional mask for the 2nd digit of day based on the first digit
    if (dayPart.startsWith('3'))
      formatChars['D'] = '[0-1]'; // To block 39, 32, etc.
    else if (dayPart.startsWith('0'))
      formatChars['D'] = '[1-9]'; // To block 00.
    else formatChars['D'] = '[0-9]'; // To allow 05, 15, 25  etc.

    // Conditional mask for the 2nd digit of month based on the first digit
    if (monthPart.startsWith('1'))
      formatChars['M'] = '[0-2]'; // To block 15, 16, etc.
    else formatChars['M'] = '[1-9]'; // To allow 05, 06  etc - but blocking 00.

    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      mask={mask}
      placeholder='DD-MM-YYYY'
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange3}
    ></InputMask>
  );
}

// Show how to limit to input range for each matching char from the mask value.
function CustomMaskedInput(props) {
  // Defining custom masking characters
  // P will match P or K
  // 0 (zero) will match even digits
  const formatChars = {
    P: '[PK]',
    '0': '[02468]',
  };
  return (
    <InputMask
      mask='P0000'
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      placeholder='Eg: P2266'
    ></InputMask>
  );
}

function TimeInput(props) {
  let mask = '12:34';
  let formatChars = {
    '1': '[0-2]',
    '2': '[0-9]',
    '3': '[0-5]',
    '4': '[0-9]',
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;

    // Conditional mask for the 2nd digit base on the first digit
    if (value.startsWith('2'))
      formatChars['2'] = '[0-3]'; // To block 24, 25, etc.
    else formatChars['2'] = '[0-9]'; // To allow 05, 12, etc.
    return { value, selection: newState.selection };
  };

  return (
    <InputMask
      mask={mask}
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
    ></InputMask>
  );
}

const MaterialUIMaskedInput = (props) => {
  return (
    <div style={{ background: 'white' }}>
      <InputMask
        mask='9999'
        maskChar={null}
        value={props.value}
        onChange={props.onChange}
        placeholder='Enter your PIN'
      >
        {(inputProps) => {
          console.log('MaterialUIMaskedInput inputProps=', inputProps);
          return <Input {...inputProps} />;
        }}
      </InputMask>
    </div>
  );
};

export const Form4 = () => {
  const [phone, setPhone] = useState('');
  const onChangePhoneInput = ({ target: { value } }) => setPhone(value);

  const [pin, setPin] = useState('');
  const onChangePinInput = ({ target: { value } }) => setPin(value);

  const [googleOTP, setGoogleOTP] = useState('');
  const onChangeGoogleOTPInput = ({ target: { value } }) => setGoogleOTP(value);

  const [creditCard, setCreditCard] = useState('');
  const onChangeCreditCardPInput = ({ target: { value } }) =>
    setCreditCard(value);

  const [date, setDate] = useState('');
  const onChangeDateInput = ({ target: { value } }) => setDate(value);

  const [date2, setDate2] = useState('');
  const onChangeDate2Input = ({ target: { value } }) => setDate2(value);

  const [date3, setDate3] = useState('');
  const onChangeDate3Input = ({ target: { value } }) => setDate3(value);

  const [masked, setMasked] = useState('');
  const onChangeMaskedInput = ({ target: { value } }) => setMasked(value);

  const [time, setTime] = useState('');
  const onChangeTimeInput = ({ target: { value } }) => setTime(value);

  const [maskedMaterialUI, setMaskedMaterialUI] = useState('');
  const onChangeMaskedMaterialUIInput = ({ target: { value } }) =>
    setMaskedMaterialUI(value);

  const materialUITextFieldProps = {
    id: 'filled-multiline-flexible',
    label: 'Multiline',
    multiline: true,
    maxRows: 4,
    variant: 'filled',
  };

  return (
    <div>
      <PhoneInput value={phone} onChange={onChangePhoneInput}></PhoneInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>Phone: {phone}</div>

      <PINInput value={pin} onChange={onChangePinInput}></PINInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>Pin: {pin}</div>

      <GoogleOTP
        value={googleOTP}
        onChange={onChangeGoogleOTPInput}
      ></GoogleOTP>
      <div style={{ color: 'white', marginBottom: '15px' }}>
        GoogleOTPInput: {googleOTP}
      </div>

      <CreditCardInput
        value={creditCard}
        onChange={onChangeCreditCardPInput}
      ></CreditCardInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>
        CreditCard: {creditCard}
      </div>

      <DateInput value={date} onChange={onChangeDateInput}></DateInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>Date: {date}</div>

      {/*<Date2Input value={date2} onChange={onChangeDate2Input}></Date2Input>*/}
      {/*<div style={{ color: 'white', marginBottom: '15px' }}>*/}
      {/*  Date2, a better one: {date2}*/}
      {/*</div>*/}

      {/*<Date3Input value={date3} onChange={onChangeDate3Input}></Date3Input>*/}
      {/*<div style={{ color: 'white', marginBottom: '15px' }}>*/}
      {/*  Date3, a better one: {date3}*/}
      {/*</div>*/}

      <TimeInput value={time} onChange={onChangeTimeInput}></TimeInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>Time: {time}</div>

      <CustomMaskedInput
        value={masked}
        onChange={onChangeMaskedInput}
      ></CustomMaskedInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>
        CustomMaskedInput: {masked}
      </div>

      <MaterialUIMaskedInput
        value={maskedMaterialUI}
        onChange={onChangeMaskedMaterialUIInput}
      ></MaterialUIMaskedInput>
      <div style={{ color: 'white', marginBottom: '15px' }}>
        MaterialUIMaskedInput: {maskedMaterialUI}
      </div>

      <hr style={{ color: 'white' }} />

      {/*<NumericFormat format='####' mask='_' placeholder='Enter PIN' />*/}
      <NumericFormat
        style={{ background: 'white', marginBottom: '15px' }}
        value={12323}
        prefix='$'
        thousandSeparator
        customInput={TextField}
      />

      <p>
        <NumericFormat
          style={{ background: 'white', marginBottom: '15px' }}
          value={12323}
          prefix='$'
          thousandSeparator
          customInput={TextField}
          {...materialUITextFieldProps}
        />
      </p>
    </div>
  );
};
