const routes = {
  LANDING() {
    return '/'
  },
  FORMAT_STRING_PAGE(){
    return '/string-formatter'
  },
  COUNT_CHAR_PAGE(){
    return '/string-counter'
  },
  COUNT_SERIES_PAGE(){
    return '/series-counter'
  },
  INPUT_SERIES_PAGE(){
    return '/series-input'
  },
  CRUD_APPS(){
    return '/crud-apps'
  },
  CRUD_FORM(){
    return '/crud-apps/form'
  },
  EDIT_USER(id){
    return `/crud-apps/form/edit/${id}`
  }
}
export default routes