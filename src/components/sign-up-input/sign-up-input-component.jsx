import React from "react";
import './sign-up-input-style.scss';
import InputMask from "react-input-mask";

const SignUpInput = ({onChange,titulo, icone, tipo,tamanho,id,...otherProps }) => {

    

    return(
        <div className="input-container">
                
                <div className="titulo">
                    {titulo}
                </div>
        
                <div className="uniao-container" >
                    <div className="input-field"  >
                        <input autoComplete="off" maxLength={tamanho} id={id} onChange={onChange} type={tipo} {...otherProps}  />
                        
                        <img src={icone} className="image" />
                        
                    </div>
                    
                </div>
                
                
            </div>
            )

};

export default SignUpInput;