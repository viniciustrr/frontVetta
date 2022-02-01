import React from 'react';
import './register-page-style.scss';
import SignUp from '../../components/sign-up/sign-up-component';
import TopMenu from '../../components/top-menu/top-menu-component';

const RegisterPage = () => (
    <div className="container">

        
        <div className="register-menu ">
            <TopMenu/>
        </div>
        
        <div className="textos-centro">
            <h2>Bem vindo,</h2>
            <h1>Cadastre um novo cliente.</h1>
        </div>

        <div className="forms">
            <SignUp/>
        </div>

        
        
    </div>


);

export default RegisterPage;