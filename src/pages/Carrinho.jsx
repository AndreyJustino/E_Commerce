import React, { useEffect } from "react";
import Header from "../components/Header";
import style from "./Carrinho.module.css"
import CardCart from "../components/CardCart";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = Cookies.get("token")
    if(!token){
      return navigate("/login")
    }
  })
  return (
    <>
      <Header />
      <main className={style.mainCarrinho}>

        <section className={style.cardProductsContainer}>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
          <CardCart/>
        </section>
        
      </main>
    </>
  );
}

export default Carrinho;
