import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Formik } from 'formik';
import axios from "axios";
import { withToken } from "../../utils";
import { Modal } from 'antd';
import { ROUTES } from "../../configs";
import styles from '../styles.module.scss';

export default function CrudForm(){
  const [ state, setState ] = useState({
    initialValues: {
      name: '',
      address: '',
      gender: '',
      birthDate: '',
    },
    success: false,
    userByID:[]
  })
  const { initialValues, success, userByID } = state
  const form = useRef();

  const location = useLocation();
  let id = location.pathname.split("/").pop()

  let token = sessionStorage.getItem('token')

  let baseURL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi/';

  useEffect(() => {
    if(success){
      modalSuccess()
      setTimeout(()=>{
        window.location = ROUTES.CRUD_APPS();
      },2000)
    }
  },[success])

  useEffect(() => {
    if(id){
      getDataById()
    }
  },[id])

  const getDataById = () => {
    axios(withToken({ method:'GET', baseURL: baseURL, token: token, url: `${baseURL}user/${id}` }))
        .then((res) => {
          setState(s => {
            return { ...s, 
              userByID: res.data.data,
              initialValues: {
                name: res.data.data.name,
                address: res.data.data.address,
                gender: res.data.data.gender,
                birthDate: res.data.data.born_date,
              },
            }
          })
        })
        .catch((e) => {
          console.log(e)
        });
  }

  const _handleSubmit = () => {
    let payload={},  { current: { values } } = form;
    payload = {
      name: values.name,
      address: values.address,
      gender: values.gender === 'Pria' ? 'l' : 'p',
      born_date: values.birthDate
    }
    let method = id ? 'PUT' : 'POST';
    let url = id ? `${baseURL}user/${id}` : `${baseURL}user`
    axios(withToken({ method:method, baseURL: baseURL, token: token, url: url, data: payload }))
      .then((res) => {
        setState(s => {
          return { ...s, success: true}
        })
      })
      .catch((e) => {
        console.log(e)
      });
  }
  const modalSuccess = () => {
    Modal.success({
      content: id ? 'Edit Berhasil': 'Input Berhasil',
    });
  };
  const renderForm = ({values, handleChange, setFieldValue, handleSubmit}) =>{
    console.log(values)
    return (
      <form onSubmit={handleSubmit}>
      <div className={clsx(styles.inputContent, styles.formContent)}>
        <div className={styles.inputWrapper}>
          <div>
          <label>Nama</label>
            <input 
            id='name'
            name='name' 
            placeholder="Masukan nama" 
            value={values?.name}
            onChange={handleChange}
            required
            />
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <div>
          <label>Alamat</label>
            <input 
            name='address' 
            placeholder="Masukan alamat" 
            value={values?.address}
            onChange={handleChange}
            required
            />
          </div>
        </div>
        <div className={styles.radioWrapper}>
          <label>P/W</label>
          <div>
            <span>
              <input 
                type="radio" 
                id="pria" 
                name="pria" 
                checked={values.gender === 'Pria' || values.gender === 'l'}
                value="Pria"
                onChange={({ target: { value } }) => setFieldValue('gender', value)}
              />
              <label for="html">Pria</label><br></br>
            </span>
            <span>
             <input 
                type="radio" 
                id="wanita" 
                name="wanita" 
                checked={values.gender === 'Wanita' || values.gender === 'p'}
                value="Wanita"
                onChange={({ target: { value } }) => setFieldValue('gender', value)}
              />
              <label for="html">Wanita</label><br></br>
            </span>
          </div>
        </div>
        <div className={styles.dateWrapper}>
          <label>Tanggal Lahir</label>
          <input 
            type="date" 
            id="birthDate" 
            name="birthDate" 
            value={values?.birthDate}
            onChange={({ target: {value}})=> setFieldValue('birthDate', value)}
            required
          />
        </div>
        <button className="btn-primary" type="submit">Process</button>
      </div>
    </form>
    )
  }
  return (
    <>
      <h1>CRUD Form</h1>
      <Formik
        innerRef={form}
        initialValues={initialValues}
        onSubmit={_handleSubmit}
        enableReinitialize
      >
        {renderForm}
      </Formik>
    </>
  )
}