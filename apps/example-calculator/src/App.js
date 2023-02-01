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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.init()
  }

  init() {
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
    if (this.state.renew) {
      this.reset()
    }

    const zeroInvalidAppend = val == '0' && this.state.display === DEFAULT_STATE.display
    if (zeroInvalidAppend) {
      return
    }

    this.setState({ 
      display: this.state.display + val
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
    this.setState({ 
      op, 
      operand1: Number(this.state.display), 
      eq: `${this.state.display} ${this.getOperationSign(op)}` 
    })
    this.clearDisplay()
  }

  getOperationSign(op) {
    return {
      'add': '+',
    }[op]
  }
  
  eval() {
    const noOperation = !this.state.op
    const alreadyEvaluated = this.state.renew

    if (noOperation || alreadyEvaluated) {
      return;
    }

    const operand2 = Number(this.state.display)
    const op = operations[this.state.op]
    const result = op(this.state.operand1, operand2)

    this.setState({ 
      display: result,
      eq: `${this.state.eq} ${operand2} =`,
      renew: true
    })
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <div className="calculator-equation">{this.state.eq == '' ? '\u00A0' : this.state.eq}</div>
          <div className="calculator-display">{this.state.display == '' ? '0' : this.state.display}</div>
          <div className="calculator-keyboard">
            <button disabled></button>
            <button onClick={() => this.clearDisplay()}>CE</button>
            <button onClick={() => this.reset()}>C</button>
            <button onClick={() => this.revert(1)}>&#60;</button>

            <button onClick={() => this.append('7')}>7</button>
            <button onClick={() => this.append('8')}>8</button>
            <button onClick={() => this.append('9')}>9</button>
            <button>x</button>
            
            <button onClick={() => this.append('4')}>4</button>
            <button onClick={() => this.append('5')}>5</button>
            <button onClick={() => this.append('6')}>6</button>
            <button>-</button>

            <button onClick={() => this.append('1')}>1</button>
            <button onClick={() => this.append('2')}>2</button>
            <button onClick={() => this.append('3')}>3</button>
            <button onClick={() => this.setOperation('add')}>+</button>
            
            <button>+/-</button>
            <button onClick={() => this.append('0')}>0</button>
            <button>,</button>
            <button onClick={() => this.eval()} className="secondary">=</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
