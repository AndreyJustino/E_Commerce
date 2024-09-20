import React from "react";
import Header from "../components/Header";
import style from "./Carrinho.module.css"
import CardCart from "../components/CardCart";

function Carrinho() {
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
