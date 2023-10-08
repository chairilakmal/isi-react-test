import React, { useState } from "react";
import styles from './styles.module.scss';

export default function CountChar(){
  const [ state, setState ] = useState({
    char:'', final: null
  })
  const { char, final } = state
  const handleValue = ({target: { value} }) => {
    setState(s => {
      return { ...s, char: value}
    })
  }
  const handleSubmit = () => {
    let result = char.split('').reduce(function(dst, c) {
      dst[c] = (dst[c] || 0) + 1;
      return dst;
    }, {});
    console.log('res', result)
    setState(s => {
      return { ...s, final: result}
    })
  }

  const handleDelete = () => {
    setState(s => {
      return { ...s, char:'', final: null}
    })
  }

  const _renderObject = () => {
    const keys = Object.keys(final);
    const value = Object.values(final);
    return Object.keys(final).map((obj, i) => {
        return (
            <div>
                {keys[i]} = {value[i]}
            </div>
        )
    })
  }

  return (
    <>
      <h1>Count Char</h1>
      <div className={styles.inputContainer}>
          <div className={styles.inputContent}>
              <div className={styles.inputWrapper}>
                <div>
                <label>Input kata</label>
                  <input name='char' placeholder="Masukan kata" value={char} 
                  onChange={handleValue}/>
                </div>
                <button onClick={handleSubmit}>Process</button>
                <button onClick={handleDelete}>Reset</button>
              </div>
              {final && <div className={styles.resultWrapper}>
                Hasil :
                {_renderObject()}
              </div>}
            </div>
      </div>
    </>
  )
}