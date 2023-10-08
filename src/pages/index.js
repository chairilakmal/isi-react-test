import React, { useEffect } from "react";
import { ROUTES } from "../configs";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';
import axios from "axios";
import { withBasic } from "../utils";

export default function Landing(){
  const linkLogic = [
    {
      label: 'Case 1',
      title: 'Format String',
      route: ROUTES.FORMAT_STRING_PAGE()
    },
    {
      label: 'Case 2',
      title: 'Count Char',
      route: ROUTES.COUNT_CHAR_PAGE()
    },
    {
      label: 'Case 3',
      title: 'Input Deret',
      route: ROUTES.INPUT_SERIES_PAGE()
    },
    {
      label: 'Case 4',
      title: 'Hitung Deret',
      route: ROUTES.COUNT_SERIES_PAGE()
    }
  ]

  useEffect(() => {
    getAuth()
  },[])
  
  const getAuth = () =>{
  let baseURL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi/';
  let payload = { email: 'hairilakmal21@gmail.com', password: '1234qwer' }
    axios(withBasic({ method:'POST', baseURL: baseURL, url: `${baseURL}auth/login`, data: payload }))
    .then((res) => {
      sessionStorage.setItem('token', res?.data?.token)
    })
    .catch((e) => {
      console.log(e)
    });

  }

  return (
    <>
      <h1>Test Assesment React</h1>
      <div className={styles.mainContainer}>
        <div className={styles.logContainer}>
          { linkLogic.map((item, idx) => (
            <div key={idx}>
              <Link to={item.route} className={styles.logLink}>
                <div>
                  <label>{item.label}</label>
                  <p>{item.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link to={ROUTES.CRUD_APPS()} className={styles.appContainer}>
          <div className={styles.crudLink} >
            CRUD APPS
          </div>
        </Link>
      </div>
    </>
  )
}