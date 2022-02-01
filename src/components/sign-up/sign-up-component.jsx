import React, { useState } from "react";
import './sign-up-style.scss';
import SignUpInput from "../sign-up-input/sign-up-input-component";
import Profile from "../../assets/profile-white.png";
import Email from "../../assets/email-white.png";
import CPF from "../../assets/cpf-white.png";
import CEP from "../../assets/cep-white.png";
import Telefone from "../../assets/celular-white.png";
import BASE_URL from "../../Services/bases";
import axios from "axios";






const SignUp = () => {


    const [userCredentials, setUserCredentials] = useState({
        nome: "",
        email: "",
        cpfcnpj: "",
        cep: "",
        classificacao: "",
        telefone: "",
        listaTelefones:[]
      });
    
      const {nome, email, cpfcnpj, cep, classificacao, telefone,listaTelefones } = userCredentials;

      const handleChange =(event) => {
        const {name,value} = event.target;
        setUserCredentials({...userCredentials, [name]: value});  
        
      };

      const handleChangeCEP =(event) => {
        const {name,value} = event.target;
        setUserCredentials({...userCredentials, [name]: cepMask(value) });  
      };

      const handleChangeCPFCNPJ =(event) => {
        const {name,value} = event.target;
        setUserCredentials({...userCredentials, [name]: cpfCnpjMask(value) });  
      };

      


      const addNumber =() => {
        setUserCredentials(state => {
            const list = state.listaTelefones.push(telefone);
            return{
                ...userCredentials,
                listaTelefones,
                telefone: ''
            };
        })

        console.log(userCredentials);
        
      };

      async function handleSubmit(event) {
        event.preventDefault();
          
        if(email.includes("@")){
            await axios.post(`${BASE_URL}cliente/dados`, {"cLienteModel": {"nome":nome,
            "email":email,
            "cpfCNPJ":cpfcnpj,
            "cep": cep,
            "classificacao":classificacao,
            }, "telefones" :listaTelefones} ) //, "telefones": listaTelefones
            .then();
    
            setUserCredentials({nome: "", email: "", cpfcnpj:"", cep:"", classificacao:"", telefone:"",listaTelefones:[] }) 
        }else{
            alert("Email inválido!")
        }
        
        

         
              
          
        };

        const cepMask = value => {
            return value
              .replace(/\D/g, '') 
              .replace(/(\d{2})(\d)/, '$1-$2')
              .replace(/(\d{3})(\d)/, '$1-$2')
              .replace(/(\d{3})(\d{1,2})/, '$1.$2')
              .replace(/(-\d{3})\d+?$/, '$2') 
          }

        const cpfCnpjMask = value => {
            if(cpfcnpj.length >=14){
                return value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1/$2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')
            }else{
                return value
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{3})\d+?$/, '$1')
            }
            

        }



    return(
<form onSubmit={handleSubmit}>
        <div className="form-register">
            <div className="lado-esquerdo">
                
                <SignUpInput
                required
                onChange={handleChange}
                titulo="Nome:"
                icone={Profile}
                name="nome"
                value={nome}
                ></SignUpInput>

                <SignUpInput
                required
                onChange={handleChange}
                titulo="Email:"
                icone={Email}
                name="email"
                value={email}
                ></SignUpInput>

                <SignUpInput
                required
                onChange={handleChangeCPFCNPJ}
                titulo="CPF ou CNPJ:"
                icone={CPF}
                name="cpfcnpj"
                value={cpfcnpj}
                tamanho={18}
                ></SignUpInput>

                <div className="lista-telefones">
                    {listaTelefones}
                </div>


            </div>


            <div className="lado-direito">

                <SignUpInput
                onChange={handleChangeCEP}
                required
                titulo="CEP:"
                icone={CEP}
                name="cep"
                value={cep}
                tamanho={10}
                id="cep"
                ></SignUpInput>

                <div className="container-select">
                    <div><span>Classificação</span></div>

                    <select onChange={handleChange} name="classificacao" value={classificacao} className="select-sign-up">
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                        <option value="preferencial">Preferencial</option>
                    </select>

                </div>

                <div className="telefone-botao">
                    <SignUpInput
                    onChange={handleChange}
                    
                    titulo="Telefone:"
                    icone={Telefone}
                    name="telefone"
                    value={telefone}
                    ></SignUpInput>

                    <div className="botao" onClick={addNumber}>
                        +
                    </div>
                    
                </div>

                <div className="botao-enviar">
                    <button type="submit">CADASTRAR CLIENTE</button>
                </div>

                

                
            </div>
                
            
                
                
        </div>
    </form>

    )
    
    
   


};

export default SignUp;