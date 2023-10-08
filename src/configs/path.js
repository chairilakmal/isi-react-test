import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";  
import { ROUTES } from './index';
import Landing from "../pages";
import FormatString from "../pages/FormatString";
import CountChar from "../pages/CountChar";
import CountSeries from "../pages/CountSeries";
import InputSeries from "../pages/InputSeries";
import CrudApps from "../pages/Crud/";
import CrudForm from "../pages/Crud/Form";


function Path(){
  return(
    <Router>
      <Route path={ROUTES.LANDING()} component={Landing} exact/>
      <Route path={ROUTES.FORMAT_STRING_PAGE()} component={FormatString}/>
      <Route path={ROUTES.COUNT_CHAR_PAGE()} component={CountChar}/>
      <Route path={ROUTES.COUNT_SERIES_PAGE()} component={CountSeries}/>
      <Route path={ROUTES.INPUT_SERIES_PAGE()} component={InputSeries}/>
      <Route path={ROUTES.CRUD_APPS()} component={CrudApps} exact/>
      <Route path={ROUTES.CRUD_FORM()} component={CrudForm}/>
    </Router>
  )
}
export default Path
