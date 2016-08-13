import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

/**
 * `SelectField` is implemented as a controlled component, with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {value: 3};
    this.handleChange = (event, index, value) => this.setState({value});
  }


  render() {
    return (
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="aes-128-cfb" />
          <MenuItem value={2} primaryText="aes-192-cfb" />
          <MenuItem value={3} primaryText="aes-256-cfb" />
          <MenuItem value={4} primaryText="bf-cfb" />
          <MenuItem value={5} primaryText="cast5-cfb" />
          <MenuItem value={6} primaryText="des-cfb" />
          <MenuItem value={7} primaryText="rc2-cfb" />
          <MenuItem value={8} primaryText="rc4" />
          <MenuItem value={9} primaryText="rc4-md5" />
          <MenuItem value={10} primaryText="seed-cfb" />
        </SelectField>
    );
  }
}