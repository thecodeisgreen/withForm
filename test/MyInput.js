import React from 'react';
import PropTypes from 'prop-types';

const MyInput = ({
  onChange,
  content, 
  style,
  placeholder
}) => {
  return (
    <div>
      <input 
        style={style} 
        placeholder={placeholder} 
        onChange={(e) => onChange(e.target.value)} 
        value={content}/>
    </div>
  );
};

MyInput.propTypes = {
  onChange: PropTypes.func,
  content: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string  
};

export default MyInput;