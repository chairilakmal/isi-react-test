import React, { useState, useEffect } from "react";
// import Table from './Table'
import {Table} from 'antd'
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link } from "react-router-dom";
import { Modal } from 'antd';
import { ROUTES } from "../../configs";
import { withToken } from "../../utils";
import styles from '../styles.module.scss';

dayjs.extend(utc);

export default function CrudApps(){
  let token = sessionStorage.getItem('token')

  let baseURL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi/';

  const [state, setState] = useState({
    data:[], modalDelete: false, delTarget: undefined, successDelete: false
  })

  const { data, modalDelete, delTarget, successDelete } = state

  useEffect(()=>{
    getData()
  },[])

  const handleDelete = (id) => {
    setState(s => {
      return { ...s, modalDelete: true, delTarget: id}
    })
  }
  const confirmDelete = () => {
    axios(withToken({ method:'DELETE', baseURL: baseURL, token: token, url: `${baseURL}user/${delTarget}` }))
        .then((res) => {
          setState(s => {
            return { ...s, successDelete: true, modalDelete: false}
          })
          getData()
        })
        .catch((e) => {
          setState(s => {
            return { ...s, modalDelete: false}
          })
          console.log(e)
        });
  }
  const handleClose = () => {
    setState(s => {
      return { ...s, modalDelete: false, successDelete: false}
    })
  }
  const getData = () => {
    axios(withToken({ method:'GET', baseURL: baseURL, token: token, url: `${baseURL}user` }))
        .then((res) => {
          const dataWithIndex = res.data.data.map((item, index) => ({
            ...item,
            index: index + 1,
          }));
          setState(s => {
            return { ...s, data: dataWithIndex}
          })
        })
        .catch((e) => {
          console.log(e)
        });
  }

  const column = [
    {
      title: 'No',
      width: 54,
      dataIndex: 'index'
    },
    {
      title: 'Nama',
      width: 200,
      dataIndex: 'name'
    },
    {
      title: 'Alamat',
      width: 200,
      dataIndex: 'address'
    },
    {
      title: 'P/W',
      width: 80,
      dataIndex: 'gender',
      render:(gender)=>{
        return gender === 'p' ? 'Pria' : 'Wanita' 
      }
    },
    {
      title: 'Tanggal Lahir',
      width: 150,
      dataIndex: 'born_date',
      render:(born_date)=>{
        return dayjs.utc(born_date).format('DD MMM. YYYY')
      }
    },
    {
      title: 'Tanggal Input',
      width: 170,
      dataIndex: 'created_at',
      render:(created_at)=>{
        return dayjs.utc(created_at).format('DD MMM YYYY HH:mm')
      }
    },
    {
      title: 'Aksi',
      width: 100,
      render: (data) => {
        return (
          <div className={styles.actionCol}>
            <div className={styles.undeveloped}>View</div>
            <div className={styles.undeveloped}>Edit</div>
            <div onClick={handleDelete.bind(this, data.id)} className={styles.delete}>Delete</div>
          </div>
        )
      }
    },
  ]

  return (
    <>
      <h1>CRUD APPS</h1>
      <Link to={ROUTES.CRUD_FORM()} className={styles.logLink}>
        <button className="btn-primary" style={{marginBottom: '32px'}}>Tambah User</button>
      </Link>
      <Table 
        columns={column}
        dataSource={data} 
      />
      <Modal
        title="Hapus Data ?"
        open={modalDelete}
        onOk={confirmDelete}
        onCancel={handleClose}
      >
        Apa Anda yakin ingin menghapus data ini ?
      </Modal>
      <Modal
        title="Hapus Data Berhasil"
        open={successDelete}
        onOk={handleClose}
        onCancel={handleClose}
      >
        Data telah berhasil dihapus
      </Modal>
    </>
  )
}