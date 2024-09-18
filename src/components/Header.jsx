import React, { useState } from "react";
import style from "./Header.module.css";
import SearchInput from "./SearchInput";
import axios from 'axios';
import Loading from "./Loading";

function Header() {
  const [loading, setLoading] = useState(false)

  function abrirMenu(){
    const menu = document.getElementById("menu-mobile")
    const overlay = document.getElementById("overlay-menu")
    overlay.style.display = "block"
    menu.style.display = "block"
  }

  function fecharMenu(){
    const menu = document.getElementById("menu-mobile")
    const overlay = document.getElementById("overlay-menu")
    overlay.style.display = "none"
    menu.style.display = "none"
  }

  async function buscar(dado) {
    try {
      const overlay = document.getElementById("overlay");
      overlay.style.display = "block";
      setLoading(true);
  
      if (dado) {
        const response = await axios.get(`https://api-e-commerce-m17f.onrender.com/getProducts/${dado}`);
        console.log(response.data);
      }
  
      setLoading(false);
      overlay.style.display = "none";

    } catch (error) {
        console.log(error.message);
        setLoading(false);
        overlay.style.display = "none"
    }
  }
  

  function receberDados(dados) {
    buscar(dados.data)
  }

  return (
    <header className={style.header}>
      <div className="overlayCL" id="overlay"></div>
      {
        loading &&
        <div className="loadingCL"><Loading/></div>
      }
      <img src="./src/assets/logo.png" alt="logo" className={style.logoHeader}/>

      <SearchInput receberDados={receberDados}/>

      <div className={style.btn_abrir} id="btn-abrir" onClick={abrirMenu}>
        <img src="./src/assets/icon/menu.png" alt="menu" className={style.menu}/>
      </div>

      <div className={style.menu_mobile} id="menu-mobile">
        <div className={style.btn_fechar} id="btn_fechar" onClick={fecharMenu}>
          <img src="./src/assets/icon/close.png" alt="close" />
        </div>

        <nav class={style.nav_mobile} id="nav-mobile">
          <ul>
            <li>Home</li>
            <li>Cadastrar</li>
            <li>Entrar</li>
            <li>Carrinho</li>
          </ul>
        </nav>
      </div>

      <div class={style.overlay_menu} id="overlay-menu"></div>

      <nav class={style.nav_desktop}>
        <ul>
            <li>Home</li>
            <li>Cadastrar</li>
            <li>Entrar</li>
            <li className={style.molduraCartHeader}><img src="./src/assets/icon/iconCart.png"/></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
