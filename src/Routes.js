import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

const Auth = lazy(() => import('./view/auth'));
const Register = lazy(() => import('./view/register'));
const Vehicles = lazy(() => import('./view/vehicles'));
const VehicleEdit = lazy(() => import('./view/vehicles/edit'));

const Login = () => (<h1>login</h1>);

const Routs = () => (
    <Router>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5 pt-5"><CircularProgress/></div>}> 
            <Routes>
                <Route exact path="/" element={<Auth/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route exact path="/vehicles" element={<Vehicles/>} />
                <Route exact path="/vehicles/create" element={<VehicleEdit/>} />
                <Route exact path="/vehicles/:id/edit" element={<VehicleEdit/>} />
            </Routes>
        </Suspense>
    </Router>
)

export default Routs;