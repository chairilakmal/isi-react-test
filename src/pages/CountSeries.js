import React, { useState } from "react";
import styles from './styles.module.scss';
export default function CountSeries(){
  const [ state, setState ] = useState({
    number:[], nilaiTerbesar: undefined, nilaiTerkecil: undefined, average: undefined
  })
  const { number, nilaiTerbesar, nilaiTerkecil, average } = state

  const handleValue = ({target: { value} }) => {
    setState(s => {
      return { ...s, number: value}
    })
  }
  const handleSubmit = () => {
    let arrNumber = number.split(/[ ,]+/).map(Number)
    setState(s => {
      return { ...s, 
        nilaiTerbesar: Math.max(...arrNumber),
        nilaiTerkecil: Math.min(...arrNumber),
        average: arrNumber.reduce((a, b) => a + b) / arrNumber.length
      }
    })
  }

  const handleDelete = () => {
    setState(s => {
      return { ...s, 
        number:'',
        nilaiTerbesar: undefined,
        nilaiTerkecil: undefined,
        average: undefined
      }
    })
  }

  return (
    <>
    <h1>Hitung Deret</h1>
    <div className={styles.inputContainer}>
          <div className={styles.inputContent}>
              <div className={styles.inputWrapper}>
                <div>
                <label>Input bilangan</label>
                  <input name='number' placeholder="Cth: 20, 21, 80, 21, 55, 31" value={number} 
                  onChange={handleValue}/>
                </div>
                <button onClick={handleSubmit}>Process</button>
                <button onClick={handleDelete}>Reset</button>
              </div>
              {average && <div className={styles.resultWrapper}>
                Hasil :
                <ul>
                  <li>Nilai Terbesar : {nilaiTerbesar}</li>
                  <li>Nilai Terkecil : {nilaiTerkecil}</li>
                  <li>Nilai Rata-rata : {Math.floor(average)}</li>
                </ul>
              </div>}
            </div>
      </div>
    </>
  )
}