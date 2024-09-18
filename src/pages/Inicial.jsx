import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import style from "./Inicial.module.css"
import CartProduct from '../components/CartProduct'
import axios from "axios"

function Inicial() {
  const [data, setData] = useState([])


  useEffect(() => {
    axios.get("https://api-e-commerce-m17f.onrender.com/getAllProducts")
    .then((response) => {
      setData(response.data.data)
    })
  }, [])

  return (
    <>
      <Header/>
      <main className={style.mainInicial}>
          <section className={style.sectionInicial}>
            {
              data.map((item, index) => {
                return <CartProduct key={index} nomeProduto={item.nome} precoProduto={item.preco} quantidadeProduto={item.quantidade} codProduto={item.code}/>
              })
            }
          </section>
      </main>

    </>
  )
}

export default Inicial