import React, { useEffect } from 'react'
import style from "./CardCart.module.css"

function CardCart({nomeProduto, codigo, quantidade, preco, index}) {

    useEffect(() => {
        preco = preco * quantidade
    }, [])
  
    return ( 

        <div className={style.cardCart}>
            
            <div className={style.molduraImgCart}>

            </div> {/*imagem do produto */}
            
            <div className={style.containerTituloCart}>
                    <h1>{nomeProduto}</h1>
                    <p>{codigo}</p>
                </div>
                <div  className={style.containerPrecoCart}>
                    <div>
                        <button onClick={() => {
                            let input = document.getElementById("inputQuantidade"+index)

                            let valor = Number(input.value) - 1
                            
                            if(valor > 0){
                                input.value = valor
    
                                preco = preco * valor
                            }


                        }}>-</button>
                        <input type="text" id={'inputQuantidade'+index} readOnly value="1"/>
                        <span>
                            <button onClick={() => {
                                let input = document.getElementById("inputQuantidade"+index)

                                let valor = Number(input.value) + 1
                                
                                if(valor <= quantidade){
                                    input.value = valor
    
                                    preco = preco * valor
                                }

                            }}>+</button>
                        </span>
                    </div>
                    <h2>R$ {preco}</h2>
                </div>
        
        </div>

  )
}

export default CardCart