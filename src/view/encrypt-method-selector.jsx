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
  }

  handleChange = (event, index, value) => this.props.onEvent(this.getMethodById(value));

  getMethodById = id => {
    switch(id) {
      case 1:
        return 'aes-128-cfb'
      case 2:
        return 'aes-192-cfb'
      case 3:
        return 'aes-256-cfb'
      case 4:
        return 'bf-cfb'
      case 5:
        return 'cast5-cfb'
      case 6:
        return 'des-cfb'
      case 7:
        return 'rc2-cfb'
      case 8:
        return 'rc4'
      case 9:
        return 'rc4-md5'
      case 10:
        return 'seed-cfb'
      default:
        return 'aes-256-cfb'    // default is aes-256-cfb
    }
  }
  
  getIdByMethod = method => {
    switch(method) {
      case 'aes-128-cfb':
        return 1
      case 'aes-192-cfb':
        return 2
      case 'aes-256-cfb':
        return 3
      case 'bf-cfb':
        return 4
      case 'cast5-cfb':
        return 5
      case 'des-cfb':
        return 6
      case 'rc2-cfb':
        return 7
      case 'rc4':
        return 8
      case 'rc4-md5':
        return 9
      case 'seed-cfb':
        return 10
      default:
        return 3    // default is aes-256-cfb
    }
  }

  render() {
    return (
        <SelectField value={this.getIdByMethod(this.props.value)} onChange={this.handleChange}>
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