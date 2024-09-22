import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import style from "./Carrinho.module.css"
import CardCart from "../components/CardCart";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Carrinho() {
  const navigate = useNavigate()
  const [carrinho, setCarrinho] = useState()
  useEffect(() => {
    try{
      
      const token = Cookies.get("token")
      
      if(!token){
        return navigate("/login")
      }

      const decoded = jwtDecode(token)

      axios.get(`https://api-e-commerce-m17f.onrender.com/getCart/${decoded.email}`,{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        setCarrinho(response.data.cart)
      })

    }catch(error){
      console.log(error.message)
    }
  }, [])
  
  return (
    <>
      <Header />
      <main className={style.mainCarrinho}>

        <section className={style.cardProductsContainer}>
          {
            carrinho && carrinho.map((item, index) => {
              return (
                <CardCart codigo={item.code} nomeProduto={item.nome} preco={item.preco} quantidade={item.quantidade} key={index} index={index}/>
              )
            })
          }
        </section>
        
      </main>
    </>
  );
}

export default Carrinho;
