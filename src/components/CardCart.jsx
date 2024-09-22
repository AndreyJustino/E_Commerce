import React, { useState } from "react";
import style from "./CardCart.module.css";

function CardCart({ nomeProduto, codigo, quantidade, preco, index, enviarDados }) {
  const [valor, setValor] = useState(1)
  
  function incrementar(){
    if(valor < quantidade){
      const novoValor = valor + 1;
      setValor(novoValor);
      enviarDados({ key: index, value: novoValor });
    }
  }

  function decrementar(){
    if (valor > 1) {
      const novoValor = valor - 1;
      setValor(novoValor);
      enviarDados({ key: index, value: novoValor });
    }
  }

  return (
    <>
      
      <div className={style.cardCart}>
        <div className={style.molduraImgCart}></div> {/*imagem do produto */}
        <div className={style.containerTituloCart}>
          <h1>{nomeProduto}</h1>
          <p>{codigo}</p>
        </div>
        <div className={style.containerPrecoCart}>
          <div>
            <button
              onClick={decrementar}
            >
              -
            </button>
            <input
              type="text"
              id={"inputQuantidade" + index}
              readOnly
              value={valor}

            />
            <span>
              <button
                onClick={incrementar}
              >
                +
              </button>
            </span>
          </div>
          <h2>R$ {preco * valor}</h2>
        </div>
      </div>
    </>
    
  );
}

export default CardCart;
