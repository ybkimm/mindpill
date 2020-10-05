import React from 'react'

export interface OptionProps {
  value: string
  onChangeValue?: (value: string) => void
}

export class Option extends React.Component<OptionProps> {
  handleClick = () => {
    if (this.props.onChangeValue != null) {
      this.props.onChangeValue(this.props.value)
    }
  }

  render() {
    return (
      <div className="option" onClick={this.handleClick}>
        {this.props.value}
      </div>
    )
  }
}

export interface SelectBoxProps {
  name: string
  values: Array<string>
  placeholder?: string
  required?: boolean
}

export interface SelectBoxState {
  chosenValue: string
}

export default class SelectBox extends React.Component<SelectBoxProps, SelectBoxState> {
  state = {
    chosenValue: ''
  }

  changeValue = (value: string) => {
    this.setState({ chosenValue: value })
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  }
  render() {
    return (
      <div className="input-select">
        <input
          value={this.state.chosenValue}
          placeholder={this.props.placeholder}
          type="text"
          name={this.props.name}
          onChange={this.handleChange}
          required={this.props.required}
        />
        <div className="options">
          {this.props.values.map((value, key) => (
            <Option value={value} onChangeValue={this.changeValue} key={key} />
          ))}
        </div>
      </div>
    )
  }
}
