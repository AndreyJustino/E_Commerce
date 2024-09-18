import React from 'react'
import Header from '../components/Header'
import style from "./Inicial.module.css"
import CartProduct from '../components/CartProduct'

function Inicial() {
  return (
    <main className={style.mainInicial}>
        <Header/>
        <section>
          <CartProduct/>
        </section>
    </main>
  )
}

export default Inicial