import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextFieldInput = (props) => {
  let { input, label, autoFocus, meta: { touched, error, pristine }, ...custom } = props;
  return (
    [<TextField
      label={label}
      placeholder={label}
      error={touched && error ? true : false}
      autoFocus={autoFocus}
      {...input}
      {...custom}
    />,
    <div>{touched && error && <div className="text-input error"><FormHelperText >
      {error}
    </FormHelperText>
    </div>}
    </div>]
  )
}



export {
  TextFieldInput
}
