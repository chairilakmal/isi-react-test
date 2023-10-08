import React, { useState } from "react";
import styles from './styles.module.scss';

export default function InputSeries(){
  const [ state, setState ] = useState({
    deret1: undefined, final1:[],
    deret2: undefined, final2:[],
    deret3: undefined, final3:[],
  })
  const { deret1, final1, deret2, final2, deret3, final3 } = state

  const idxSeries = [
    {
      val: deret1,
      result: final1
    },
    {
      val: deret2,
      result: final2
    },
    {
      val: deret3,
      result: final3
    }
  ]

  const handleValue = (name,  {target: { value} }) => {
    console.log('name', name)
    setState(s => {
      return { ...s, [name]: value}
    })
  }

  const handleSubmit = (final) => {

    let ops
    let result = []

    if(final === 'final1') {
      ops = deret1
      for (let i = 1; i <= ops; i++) {
        result.push(i*i)
      }
    }
    if(final === 'final2') {
      ops = deret2
      let num = 1
      let deret = []
      let i = 1;
      while (deret.length < ops) {
        if (i % 2 !== 0) {
          deret.push(num);
          num += i;
        }
        i++;
      }
      result.push(deret)
    }
    if(final === 'final3') ops = deret3

    
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
    <h1>Input Deret</h1>
      <div className={styles.inputContainer}>
        { idxSeries.map((item, idx) => (
            <div key={idx+1}>
             <div className={styles.inputContent}>
                <div className={styles.inputWrapper}>
                  <div>
                  <label>Deret {idx+1}</label>
                    <input name={`deret${idx+1}`} placeholder="Cth: 10" value={item.val} 
                    onChange={handleValue.bind(this, `deret${idx+1}`)}/>
                  </div>
                  <button onClick={handleSubmit.bind(this, `final${idx+1}`)} disabled={idx === 2}>Process</button>
                  <button onClick={handleDelete.bind(this, `deret${idx+1}`, `final${idx+1}`)}>Reset</button>
                </div>
                { item.result.length > 0 && <div className={styles.resultWrapper}>
                  {`Hasil : ${item.result.join(' ')}`}
                </div>}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}