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
    const { content, style, placeholder } = this.props;
    return(
      <div>
        <input style={style} placeholder={placeholder} onChange={this.onUpdate} value={content}/>
      </div>
    );
  }
} 

export default MyInput;