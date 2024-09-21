import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import style from "./Inicial.module.css"
import CardProduct from '../components/CardProduct'
import axios from "axios"
import Loading from '../components/Loading'

function Inicial() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const overlay = document.getElementById("overlay")
    overlay.style.display = "block"
    
    setLoading(true)
    
    axios.get("https://api-e-commerce-m17f.onrender.com/getAllProducts")
    .then((response) => {
      
      setLoading(false)
      overlay.style.display = "none"
<<<<<<< HEAD
=======
      console.log(response.data.data)
>>>>>>> f2a50a479d5c7755e1bcf67e7bafb953b056aca6
      setData(response.data.data)
    })
  }, [])

  return (
    <>
      <div className="overlayCL" id="overlay"></div>
      {
        loading &&
        <div className="loadingCL"><Loading/></div>
      }
      <Header/>
      <main className={style.mainInicial}>
          <section className={style.sectionInicial}>
            {
              data.map((item, index) => {
<<<<<<< HEAD
                return <CardProduct key={index} nomeProduto={item.nome} precoProduto={item.preco} quantidadeProduto={item.quantidade} codProduto={item.code}/>
=======
                return <CardProduct key={index} nomeProduto={item.nome} precoProduto={item.preco} quantidadeProduto={item.quantidade} codProduto={item.code} />
>>>>>>> f2a50a479d5c7755e1bcf67e7bafb953b056aca6
              })
            }
          </section>
      </main>

    </>
  )
}

export default Inicial