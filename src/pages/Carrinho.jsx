import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import style from "./Carrinho.module.css";
import CardCart from "../components/CardCart";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SucessNotification from "../components/SucessNotification"

function Carrinho() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState();
  const [count, setCount] = useState(0)

  const [sucess, setSucess] = useState({estado: false, mensagem: ""})
  const [quant, setQuant] = useState({key: null, value: null})

  function receberQuant(quant){
    setQuant(quant)
  }

  function receberDados(dados) {
    setSucess(dados);
  }

  useEffect(() => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        return navigate("/login");
      }

      const decoded = jwtDecode(token);

      axios
        .get(
          `https://api-e-commerce-m17f.onrender.com/getCart/${decoded.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCarrinho(response.data.cart);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [count]);

  async function removerProdutoCart(code, mensagem){
    const token = Cookies.get("token")

    if(!token){
      return navigate("/login")
    }
    
    try{
      
      const response = await axios.delete(`https://api-e-commerce-m17f.onrender.com/deleteCart`,{
        headers:{
          'Authorization': `Bearer ${token}`
        },
        data: {
          code: code
        }
      })

      setCount((prevent) => prevent + 1)
      if(mensagem){
        setSucess({estado: true, mensagem: mensagem})
  
        setTimeout(() => {
          setSucess({ estado: false, mensagem: "" });
        }, 4000);
      }
      
    }catch(error){
      console.log(error.message);
    }
  }

  async function comprarProduto(index,nome,preco,code,quantidade,imgNome,emailVendedor){
    const token = Cookies.get("token")
    
    const quantOriginal = carrinho[index].quantidade

    if(quantOriginal == quantidade){
      console.log("if quantidade original <<<<<<<")
      removerProdutoCart(code)

      try{
        const response = await axios.delete(`https://api-e-commerce-m17f.onrender.com/deleteProducts`, {
          headers:{
            'Authorization': `Bearer ${token}`
          },
          data: {
            code: code,
            email: emailVendedor
          }
        })
      }catch(error){
        console.log(error.message)
      }
      
      setCount((prevent) => prevent + 1)
        setSucess({estado: true, mensagem: "Compra finalizada."})
  
      setTimeout(() => {
        setSucess({ estado: false, mensagem: "" });
      }, 4000);
      return;
    }

    try{
      removerProdutoCart(code)
      
      const response = await axios.put("https://api-e-commerce-m17f.onrender.com/putProduct",{
        nome: nome,
        preco: preco,
        imgNome: imgNome,
        code: code,
        quantidade: quantidade
      },{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })

      setCount((prevent) => prevent + 1)
        setSucess({estado: true, mensagem: "Compra finalizada."})
  
      setTimeout(() => {
        setSucess({ estado: false, mensagem: "" });
      }, 4000);

    }catch(error){
      console.log(error.message)
    }
    
  }

  return (
    <>
      <Header />
      <main className={style.mainCarrinho}>

        <section className={style.cardProductsContainer}>

          {
            sucess.estado && (
              <div className={style.notificacaoCarrinho}>
                <SucessNotification
                  message={sucess.mensagem}
                  enviarDados={receberDados}
                />
              </div>
            )
          }

          {carrinho && carrinho.length > 0 ? (
            carrinho.map((item, index) => {
              return (
                <>
                  <CardCart
                    codigo={item.code}
                    nomeProduto={item.nome}
                    preco={item.preco}
                    quantidade={item.quantidade}
                    index={index}
                    enviarDados={receberQuant}
                  />
                  <div className={style.containerCartButton}>
                    <button onClick={() => {
                      removerProdutoCart(item.code, "Produto removido com sucesso!")
                    }} className={style.buttonRemoveCart}>
                      Remover produto.
                    </button>
                    <button onClick={() => {
                      comprarProduto(index, item.nome,item.preco,item.code,quant.value, item.imgNome, item.emailVendedor)
                    }} className={style.buttonCartBuy}>
                      Comprar
                    </button>
                  </div>
                </>
              );
            })
          ) : (
            <div><h3>Nenhum produto encontrado.</h3></div>
          )}
        </section>
      </main>
    </>
  );
}

export default Carrinho;
