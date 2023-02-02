import logo from './logo.svg';
import './App.css';

import { Button } from 'example-components'
import * as operations from 'example-math'
import React from 'react';

const DEFAULT_STATE = {
  display: '',
  op: undefined,
  eq: '',
  operand1: 0,
  renew: false
}

const OPERATIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTIPLY: 'multiple',
  DIVIDE: 'divide'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...DEFAULT_STATE }
  }

  reset() {
    this.setState({ ...DEFAULT_STATE })
  }
  
  clearDisplay() {
    this.setState({
      display: DEFAULT_STATE.display
    })
  }

  append(val) {
    let display = this.state.display

    if (this.state.renew) {
      this.reset()
      display = DEFAULT_STATE.display
    }

    const zeroInvalidAppend = val === '0' && display === DEFAULT_STATE.display
    const floatingPointExists = val === ',' && display.indexOf(val) > -1
    if (zeroInvalidAppend || floatingPointExists) {
      return
    }

    const zeroFloatingAppend = val === ',' && display === DEFAULT_STATE.display
    if (zeroFloatingAppend) {
      display = '0'
    }

    const infinity = Number.POSITIVE_INFINITY === Math.abs(this.getFloat((display + val)))
    if (infinity) {
      console.log(infinity)
      return
    }

    this.setState({ 
      display: display + val
    })
  }

  revert(num) {
    const outsideRange = this.state.display.length - num < 0    
    if (outsideRange) {
      return
    }

    this.setState({
      display: this.state.display.slice(0, -num)
    })
  }

  setOperation(op) {
    const renewOperation = this.state.renew
    if (renewOperation) {
      this.setState({ renew: false })
    }

    const chainOperation = !this.state.renew && !!this.state.op
    if (chainOperation) {
      this.eval()
    }

    this.setState({ 
      op,
      operand1: this.getFloat(this.state.display), 
      eq: `${this.state.display} ${this.getOperationSign(op)}` 
    })
    this.clearDisplay()
  }

  reverseSign() {
    const noInput = this.state.display === DEFAULT_STATE.display
    if (noInput) {
      return
    }

    this.setState({
      display: 
        this.state.display[0] === '-' 
          ? this.state.display.slice(1, this.state.display.length)
          : `-${this.state.display}`
    })
  }

  getOperationSign(op) {
    return {
      [OPERATIONS.ADD]: '+',
      [OPERATIONS.SUBTRACT]: '-',
      [OPERATIONS.MULTIPLY]: '*',
      [OPERATIONS.DIVIDE]: '/'
    }[op]
  }

  getPrettyFloat(float) {
    return float.toString().replace('.', ',')
  }

  getFloat(string) {
    return Number(string.replace(',', '.'))
  }
  
  // todo: handle outside of screen
  eval() {
    const noOperation = !this.state.op
    const alreadyEvaluated = this.state.renew

    if (noOperation || alreadyEvaluated) {
      return;
    }

    const operand2 = this.getFloat(this.state.display)
    const op = operations[this.state.op]
    const result = op(this.state.operand1, operand2)

    this.setState({ 
      display: this.getPrettyFloat(result),
      eq: `${this.state.eq} ${this.getPrettyFloat(operand2)} =`,
      renew: true
    })
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div className="calculator-heading">Example Calculator</div>
          <div className="calculator-equation">{
            this.state.eq === DEFAULT_STATE.eq ? '\u00A0' : this.state.eq
          }</div>
          <div className="calculator-display">{
            this.state.display === DEFAULT_STATE.display ? '0' : this.state.display
          }</div>
          <div className="calculator-keyboard">
            <button onClick={() => this.revert(1)}>&#60;</button>
            <button onClick={() => this.clearDisplay()}>CE</button>
            <button onClick={() => this.reset()}>C</button>
            <button onClick={() => this.setOperation(OPERATIONS.DIVIDE)}>/</button>

            <button onClick={() => this.append('7')}>7</button>
            <button onClick={() => this.append('8')}>8</button>
            <button onClick={() => this.append('9')}>9</button>
            <button onClick={() => this.setOperation(OPERATIONS.MULTIPLY)}>x</button>
            
            <button onClick={() => this.append('4')}>4</button>
            <button onClick={() => this.append('5')}>5</button>
            <button onClick={() => this.append('6')}>6</button>
            <button onClick={() => this.setOperation(OPERATIONS.SUBTRACT)}>-</button>

            <button onClick={() => this.append('1')}>1</button>
            <button onClick={() => this.append('2')}>2</button>
            <button onClick={() => this.append('3')}>3</button>
            <button onClick={() => this.setOperation(OPERATIONS.ADD)}>+</button>
            
            <button onClick={() => this.reverseSign()}>+/-</button>
            <button onClick={() => this.append('0')}>0</button>
            <button onClick={() => this.append(',')}>,</button>
            <button onClick={() => this.eval()} className="secondary">=</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
