import React from 'react';


class MyInput extends React.Component {
  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { value, style, placeholder } = this.props;
    return(
      <div>
        <input style={style} placeholder={placeholder} onChange={this.onUpdate} value={value}/>
      </div>
    );
  }
} 

export default MyInput;