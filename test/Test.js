
import React, { useState } from 'react';

import withForm from '../index';

import MyInput from './MyInput';

const useTest = (form) => {
  const [values, setValues] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form.values());
    console.log(form.isValid());
    setValues(form.values());
  };

  return {
    values,
    onSubmit
  };
};

const Test = ({
  form
}) => {
  const {
    onSubmit,
    values
  } = useTest(form);

  return (
    <div style={{ width: '300px' }}>
      <form onSubmit={onSubmit}>
        <h3>withForm</h3>
        {
          form.manageField(
            'email', 
            {
              defaultValue: '', 
              isValid: v => {
                console.log('fsdkhfksdj');
                return v.length > 6;
              },
              isUpdated: e => {
                console.log('onChange');
              }
            }
          )(<input style={{ width: '100%' }} placeholder="email"/>)
        }
        <br/>
        {form.manageField('password', { defaultValue: '', isValid: v => v.length > 6 })(<input style={{ width: '100%' }} type="password" placeholder="mot de passe"/>)}
        <br/>
        {form.manageField('about', { defaultValue: '', valueKey: 'content', isValid: v => v.length > 6 })(<MyInput style={{ width: '100%' }} placeholder="about you"/>)}
        <br/>
        <button type="submit">Ok</button>
      </form>
      <div>
        {JSON.stringify(values)}
      </div>
    </div>
  );
};

export default withForm(Test);