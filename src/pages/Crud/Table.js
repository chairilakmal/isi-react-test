import React from "react";
import PropTypes from 'prop-types';
import { get } from 'lodash';
import styles from '../styles.module.scss';

export default function Table({columns, data}){
  return (
    <div>
      <table className={styles.table}>
        <colgroup>
            {columns.map((col, i) => (
              <col key={i} style={{ width: col.width }} />
            ))}
          </colgroup>
        <thead>
          {columns.map((col, i) => {
            return (
              <th key={i}>
                <p>{col.title}</p>
              </th>
            )
          })}
        </thead>
        <tbody>
          { data.map((row, rowIndex) => {
            return(
              <tr key={rowIndex}>
                { data.map((col, idx) => {
                  console.log(col)
                  let content = get(row, col, '-')
                  if (col === 'row_number') {
                    content = rowIndex + 1;
                  } 
                  return (
                    <td key={idx}>
                      {typeof col.render === 'function' ? col.render(row) : (
                          <p className={styles.tableContent}>{content}</p>
                      )}
                    </td>
                  )
                }) }
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}