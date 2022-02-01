import React,{useState, useEffect} from 'react';
import './view-style.scss';
import TopMenu from '../../components/top-menu/top-menu-component';
import SignUpInput from '../../components/sign-up-input/sign-up-input-component';
import Lapis from "../../assets/lapis-white.png";
import axios from "axios";
import BASE_URL from "../../Services/bases"

const ViewPage = () => {


    
    const columnNames = ['Tipo', 'Nº', "Nome", "Classificação"];

    const [dadosTabela, setDadosTabela] = useState({
        tableData: [],
    });

    const [nomePesquisa, setnomePesquisa] = useState(
        ""
    );

    const [dadosEditaveis, setDadosEditaveis] = useState({
        tipo:"",
        n: "",
        classificacao: "",
        email:"",
        cep:"",
        telefones: [],
        nome: "",
        id:""
    });
    const {tipo, n, classificacao, email, cep, telefones, nome,id} = dadosEditaveis;

    

    const handleChange =(event) => {
        const {value} = event.target;
        setnomePesquisa(value);
      };


    const handleChangesPesquisa =(event) => {
        const {name,value} = event.target;
        setDadosEditaveis({...dadosEditaveis, [name]: value});
    };

    useEffect(async ()=>{
        
        await axios.put(`${BASE_URL}cliente/${id}`, { "id":id,"nome": nome,"email":email,"cpfCNPJ":n, "cep":cep, "classificacao":classificacao}) //"telefones":telefones
        .then(res=>console.log(res)
        )
       
       },[n,classificacao,email,cep,telefones])



    function procuraDadosIndividual(idPesquisa){
        axios.get(`${BASE_URL}cliente/${idPesquisa}`)
        .then(res => {
            const tipoJuri = res.data.cpfCNPJ.length > 11 ? "Física" : "Jurídica";
            setDadosEditaveis({...dadosEditaveis,
                tipo:  tipoJuri,
                n: res.data.cpfCNPJ ,
                classificacao: res.data.classificacao,
                email: res.data.email,
                cep: res.data.cep,
                nome: res.data.nome,
                telefones: res.data.telefones,
                id: idPesquisa});
        })
        
    }
    

    function mapeiaDadosTable(nomePesquisa){
        axios.get(`${BASE_URL}cliente`)
        .then(res => {
            const resposta = [];
            var size = res.data.length-1;
            parseInt(size);
           
            for(let i = size; i >= 0; i--){
                const item = {"tipo":"", "cpfCNPJ":"", "nome":"", "classificacao":"", "id":""};
                item.tipo =  {value:res.data[i].cpfCNPJ.length > 11 ? "Física" : "Jurídica", visible:true};  //cnpj 11 cpf 14
                item.cpfCNPJ = {value:res.data[i].cpfCNPJ, visible:true};
                item.nome =  {value:res.data[i].nome , visible:true} ;
                item.classificacao =  {value:res.data[i].classificacao , visible:true};
                item.id =  {value:res.data[i].id , visible:false};
                resposta.push(item)
              
            }
            const tabelaFiltrada = resposta.filter(pessoa => pessoa.nome.value.toLowerCase().includes(nomePesquisa.toLowerCase()));
            setDadosTabela({ tableData: tabelaFiltrada });
        });
    }

    useEffect( () =>{
        mapeiaDadosTable(nomePesquisa)  
       },[nomePesquisa] );

    const {tableData} = dadosTabela;

    async function excluirCliente(idCliente){
        
    
       await axios.delete(`${BASE_URL}cliente/${idCliente}`)
        .then(res=>console.log(res));
        window.location.reload();
    

        
    }



    return(
        <div className="container">

            
            <div className="register-menu ">
                <TopMenu/>
            </div>


            <div className='display-busca'>

                <div>
                    <div className="textos-centro">
                        <h1>Verifique seus clientes.</h1>
                    </div>

                    <div className='busca-input'>
                        <SignUpInput
                            titulo="Nome do cliente:"   
                            name="nomePesquisa"
                            onChange={handleChange}
                            value={nomePesquisa}
                        ></SignUpInput>
                    </div>
                

                    <div className="info-menu-table-historico" style={{"width": "800px", "height": "390px", "overflow-y": "scroll", "overflow-x": "hidden"}}>
                        <Table list={tableData} colNames={columnNames} width="800px"/>
                    </div>

                </div>

                <div>
                    <div className='info-individual'>
                        <div className='info-individual-header'>{nome}</div>
                        <div className='info-individual-body'>
                        <SignUpInput
                            required
                            titulo="Tipo:"
                            
                            name="tipo"
                            value = {tipo}
                            
                        ></SignUpInput>

                        <SignUpInput
                            required
                            titulo="Nº:"
                            icone={Lapis}
                            name="n"
                            value={n}
                            onChange={handleChangesPesquisa}
                        ></SignUpInput>

                        <SignUpInput
                            required
                            titulo="Classificação:"
                            icone={Lapis}
                            name="classificacao"
                            value={classificacao}
                            onChange={handleChangesPesquisa}
                        ></SignUpInput>

                        <SignUpInput
                            required
                            titulo="Email:"
                            icone={Lapis}
                            name="email"
                            value={email}
                            onChange={handleChangesPesquisa}
                        ></SignUpInput>

                        <SignUpInput
                            required
                            titulo="CEP:"
                            icone={Lapis}
                            name="cep"
                            value={cep}
                            onChange={handleChangesPesquisa}
                        ></SignUpInput>

                        <SignUpInput
                            required
                            titulo="Telefones"
                            icone={Lapis}
                            name="telefones"
                            value={telefones}
                            onChange={handleChangesPesquisa}
                        ></SignUpInput>

                        <div className="botao-excluir-cliente">
                            <button onClick={() => {excluirCliente(id)} }>EXCLUIR CLIENTE</button>
                        </div>

                        </div>
                    </div>

                </div>
                
            </div>

            


            
            

            
            
        </div>

    )

    function Table({list, colNames, width = 'auto', height = 'auto'}){
        return(
            <div>
                <table cellSpacing="0" style={{"width" :width, "height":height}} className="table-historico-2">
                    <thead>
                        <tr>
                            {colNames.map((headerItem, index) => (
                                <th key={index}>
                                    {headerItem}
                                </th>    
                            ))}
                        </tr>
                    </thead>
                    
                    

                        <tbody>
                            {Object.values(list).map((obj, index) => (
                                <tr key={index}>
                                    {Object.values(obj).map((value, index2) => (
                                    
                                        <td key={index2} onClick ={()=>{procuraDadosIndividual(obj.id.value)}} >
                                        {value.visible && value.value}
                                        </td>
                                    ))}
                                </tr>    
                            ))}
                        </tbody>
                </table>
            </div>
        )

    }
  
};



    




export default ViewPage;

