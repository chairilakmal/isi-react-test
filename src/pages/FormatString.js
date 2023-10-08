import React, { useState } from "react";
import styles from './styles.module.scss';

export default function FormatString(){
  const [ state, setState ] = useState({
    string1: '', final1:'', string2: '', final2:''
  })
  const { string1, final1, string2, final2 } = state

  const idxString = [
    {
      val: string1,
      result: final1
    },
    {
      val: string2,
      result: final2
    }
  ]

  const handleValue = (name,  {target: { value} }) => {
    setState(s => {
      return { ...s, [name]: value}
    })
  }

  const handleSubmit = (final) => {
    let result

    if(final === 'final1') {
      result = string1.toLowerCase().split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').replace(/[^a-zA-Z0-9 ]/g, '')
    }
    if(final === 'final2') {
      result = string2.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join('-')
    }
    setState(s => {
      return { ...s, [final]: result}
    })
  }

  const handleDelete = (name, final) => {
    setState(s => {
      return { ...s, [name]:'', [final]: []}
    })
  }

  return (
    <>
    <h1>Format String</h1>
      <div className={styles.inputContainer}>
        { idxString.map((item, idx) => (
            <div key={idx+1}>
             <div className={styles.inputContent}>
                <div className={styles.inputWrapper}>
                  <div>
                  <label>String {idx+1}</label>
                    <input name={`string${idx+1}`} placeholder="Masukan kata/kalimat" value={item.val} 
                    onChange={handleValue.bind(this, `string${idx+1}`)}/>
                  </div>
                  <button onClick={handleSubmit.bind(this, `final${idx+1}`)}>Process</button>
                  <button onClick={handleDelete.bind(this, `string${idx+1}`, `final${idx+1}`)}>Reset</button>
                </div>
                { item.result.length > 0 && <div className={styles.resultWrapper}>
                  {`Hasil : ${item.result}`}
                </div>}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}