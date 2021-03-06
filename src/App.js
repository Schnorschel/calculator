import React, { useState, useEffect } from 'react'
import KeyPad from './components/KeyPad'
import KeyboardEventHandler from 'react-keyboard-event-handler'

const App = () => {
  // prettier-ignore
  const calcKeys = [{label: "7", width: "w25"}, {label: "8", width: "w25"}, {label: "9", width: "w25"}, {label: "÷", width: "w25"},
                    {label: "4", width: "w25"}, {label: "5", width: "w25"}, {label: "6", width: "w25"}, {label: "x", width: "w25"},
                    {label: "1", width: "w25"}, {label: "2", width: "w25"}, {label: "3", width: "w25"}, {label: "–", width: "w25"},
                    {label: "C", width: "w25"}, {label: "0", width: "w25"}, {label: ".", width: "w25"}, {label: "+", width: "w25"}]

  const [prevDisplay, setPrevDisplay] = useState('0')
  const [display, setDisplay] = useState('0')
  const [prevKeypress, setPrevKeypress] = useState()
  const [operator, setOperator] = useState('+')
  const [history, setHistory] = useState([])

  // const [nextOperator, setNextOperator] = useState()
  // const [prevOperator, setPrevOperator] = useState('+')

  const operate = (a, b) => {
    console.log(a + operator + b)
    switch (operator) {
      case '+':
        return a + b
      case '–': // this is an en-dash, looks nicer on the calculator key than a hyphen
      case '-':
        return a - b
      case 'x':
      case '*':
        return a * b
      case '÷':
      case '/':
        return a / b
    }
  }

  const onKeyClickWrapper = e => {
    onKeyClick(e.target.value)
  }

  // prettier-ignore
  const onKeyClick = val => {
    // const val = e.target.value
    switch(val) {
      case 'C': 
      case 'c':
                setDisplay('0')
                setPrevDisplay('0')
                setOperator('+')
                break
      case  '+':
      case  '–':
      case  'x':
      case  '*':
      case  '/':
      case  '÷':
                history.unshift(prevDisplay + ' ' + operator + ' ' + display + ' = ')
                console.log ({prevDisplay, operator, display})
                setDisplay(prev => {const val = operate(Number(prevDisplay), Number(prev))
                                    history[0] = history[0] + val
                                    return val})
                
                setPrevDisplay(display)
                setOperator(val)
                break
      default: 
        if (isNaN(prevKeypress) && prevKeypress !== '.') {
          setPrevDisplay(display)
          setDisplay(val)
        } else {
          setDisplay(prev => {return (prev + val)})
        }
        break
    }
    setPrevKeypress(val)
  }

  // Format the number to not exceed 8 chars length, or convert into scientific notation if most-significant digit were lost otherwise
  const formatDisp = disp => {
    console.log('disp: ' + disp)
    if (typeof disp === 'undefined' || disp.length == 0) {
      return ' '
    } else if (Math.log10(disp) > 8) {
      return disp.toExponential(2)
    } else {
      return disp.toString().substr(0, Math.min(8, disp.toString().length))
    }
  }

  // prettier-ignore
  return (
    <main className="main">
      <section className="calculatorContainer">
        <section className="display">{formatDisp(display)}</section>
        <section className="keysContainer">
          {calcKeys.map(k => {
            return <KeyPad 
              key={k.label}
              className={'calcKey ' + k.width} 
              label={k.label}
              handleKeyClick={onKeyClickWrapper}
              value={k.label}
            />
          })}
        </section>
        <KeyboardEventHandler
        // handleKeys={'c0123456789+-*/x.'.split('')}
        handleKeys={['numeric','+','-','/','x','.','shift+plus','c','*']}
        onKeyEvent={(key, e) => { onKeyClick(key)}}
        isExclusive={true}
      />
      </section>
      <section className="history">
        Calculation History:
        <ul className="historyList">
          {history.map((op, index) => {
            return <li key={index}>{op}</li>
          })}
        </ul>
      </section>
    </main>
  )
}

export default App
