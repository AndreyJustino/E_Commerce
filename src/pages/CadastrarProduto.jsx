import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Loading from '../components/Loading'
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import AlertNotification from '../components/AlertNotification'

function CadastrarProduto() {
    const navigate = useNavigate()
    const [nome,setNome] = useState()
    const [preco,setPreco] = useState()
    const [imagem, setImagem] = useState()
    const [quantidade, setQuantidade] = useState()
    const [erro, setErro] = useState({ estado: false, mensagem: "" });
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const token = Cookies.get("token")
        if(!token){
            return navigate("/")
        }
    }, [])

    async function cadastrarProd(e) {
        e.preventDefault();
        
        if(!nome || !preco || !imagem || !quantidade){
            setErro({ estado: true, mensagem: "Preencha todos os campos" })
            return;
        }

        try{
            const token = Cookies.get("token")
            const decoded = jwtDecode(token)

            console.table(decoded)

            const overlay = document.getElementById("overlay");
            overlay.style.display = "block";
            setLoading(true);

            // await axios.post("https://api-e-commerce-m17f.onrender.com/postProduct",{
            //     nome: nome,
            //     preco: preco,
            //     email: decoded.email,
            //     imgNome: imagem,
            //     quantidade: quantidade
            // })

        }catch(error){
            console.log(error.message)
        }
    }

    function receberDados(dados) {
        setErro(dados);
        setSucesso(dados);
      }

  return (
    <>
      <Header/>

      {loading && (
        <div className="loadingCL">
          <Loading />
        </div>
      )}

        <div className="overlayCL" id="overlay"></div>

        <form autoComplete='off' encType='multipart/form-data' onSubmit={cadastrarProd}>

            {erro.estado && (
            <AlertNotification
                message={erro.mensagem}
                enviarDados={receberDados}
            />
            )}

            <div>
                <label htmlFor='nome'>Nome do Produto: </label>
                <input type="text" name="nome" id='nome' placeholder="Nome do Produto"/>
            </div>
            <div>
                <label htmlFor='preco'>Preco: </label>
                <input type="number" name="preco" id='preco' placeholder="Preço do produto"/>
            </div>
            <div>
                <label htmlFor='imagem'>Imagem do produto: </label>
                <input type="file" name="imagem" id='imagem'/>
            </div>
            <div>
                <label htmlFor="quantidade">Quantidade: </label>
                <input type="number" name="quantidade" id="quantidade" placeholder="Quantidade"/>
            </div>
            <button type='submit'>Enviar</button>
        </form>


    </>
  )
}

export default CadastrarProduto