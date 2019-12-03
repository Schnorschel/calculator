import React, { useState, useEffect } from 'react'
import KeyPad from './components/KeyPad'

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
  // const [nextOperator, setNextOperator] = useState()
  // const [prevOperator, setPrevOperator] = useState('+')

  const operate = (a, b) => {
    console.log(a + operator + b)
    switch (operator) {
      case '+':
        return a + b
      case '–':
        return a - b
      case 'x':
        return a * b
      case '÷':
        return a / b
    }
  }

  // prettier-ignore
  const onKeyClick = e => {
    const val = e.target.value
    switch(val) {
      case 'C': 
                setDisplay('0')
                setPrevDisplay('0')
                setOperator('+')
                break
      case  '+':
                setDisplay(prev => {return operate(Number(prevDisplay), Number(prev))})
                setPrevDisplay(display)
                setOperator(val)
                break
      case  '–':
                setDisplay(prev => {return operate(Number(prevDisplay), Number(prev))})
                setPrevDisplay(display)
                setOperator(val)
                break
      case  'x':
                setDisplay(prev => {return operate(Number(prevDisplay), Number(prev))})
                setPrevDisplay(display)
                setOperator(val)
                break
      case  '÷':
                setDisplay(prev => {return operate(Number(prevDisplay), Number(prev))})
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
  <main className="calculatorContainer">
    <section className="display">{formatDisp(display)}</section>
    <section className="keysContainer">
      {calcKeys.map(k => {
        return <KeyPad 
          key={k.label}
          className={'calcKey ' + k.width} 
          label={k.label}
          handleKeyClick={onKeyClick}
          value={k.label}
        />
      })}
    </section>
  </main>
  )
}

export default App
