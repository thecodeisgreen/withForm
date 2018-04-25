## withform module
withform is an easy to use lib to help managing simple form in your react application.

withform is a HOC component.

### Installation
```
npm install --save @thecodeisgreen/withform
```

### Example
```javascript
import React from 'react'
import ReactDOM from 'react-dom';

import {
  compose,
  withHandlers,
  withState
} from 'recompose';

import withForm from '../index';

const enhance = compose(
  withForm,
  withState(
    'values',
    'setValues',
    {}
  ),
  withHandlers({
    onSubmit: ({form, setValues}) => (e) => {
      e.preventDefault();
      console.log(form.values());
      console.log(form.isValid());
      setValues(form.values());
    }
  })
);

const Test = enhance(
  ({
    form,
    onSubmit,
    values
  }) => (
    <div style={{width: '300px'}}>
      <form onSubmit={onSubmit}>
        <h3>withForm</h3>
        {form.manageField('email', {defaultValue: '', isValid: v => v.length > 6})(<input style={{width: '100%'}} placeholder="email"/>)}
        <br/>
        {form.manageField('password', {defaultValue: '', isValid: v => v.length > 6})(<input style={{width: '100%'}} type="password" placeholder="mot de passe"/>)}
        <br/>
        <button type="submit">Ok</button>
      </form>
      <div>
        {JSON.stringify(values)}
      </div>
    </div>
  )
);
```