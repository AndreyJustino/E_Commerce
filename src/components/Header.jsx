import React, { useState } from "react";
import style from "./Header.module.css";
import SearchInput from "./SearchInput";
import axios from 'axios';
import Loading from "./Loading";
import { Link } from "react-router-dom";

function Header() {
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

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
      <Link to="/">
        <img src="./src/assets/logo.png" alt="logo" className={style.logoHeader}/>
      </Link>

      <SearchInput receberDados={receberDados}/>

      <div className={style.btn_abrir} id="btn-abrir" onClick={abrirMenu}>
        <img src="./src/assets/icon/menu.png" alt="menu" className={style.menu}/>
      </div>

      <div className={style.menu_mobile} id="menu-mobile">
        <div className={style.btn_fechar} id="btn_fechar" onClick={fecharMenu}>
          <img src="./src/assets/icon/close.png" alt="close" />
        </div>

        <nav class={style.nav_mobile} id="nav-mobile">
          {
            token ? (
              <ul>
                <li><Link to="/carrinho" className="link">Carrinho</Link></li>
              </ul>
            ) :(

              <ul>
                <li><Link to="/cadastrar" className="link">Cadastrar</Link></li>
                <li><Link to="/login" className="link">Entrar</Link></li>
                <li><Link to="/carrinho" className="link">Carrinho</Link></li>
              </ul>
            )
          }
          
        </nav>
      </div>

      <div class={style.overlay_menu} id="overlay-menu"></div>

      <nav class={style.nav_desktop}>

          {
            token ? (
              <ul>
                <li className={style.molduraCartHeader}>
                  <Link to="/carrinho" className="link">
                    <img src="./src/assets/icon/iconCart.png"/>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li><Link to="/cadastrar" className="link">Cadastrar</Link></li>
                <li><Link to="/login" className="link">Entrar</Link></li>
                <li className={style.molduraCartHeader}>
                  <Link to="/carrinho" className="link">
                    <img src="./src/assets/icon/iconCart.png"/>
                  </Link>
                </li>
              </ul>
            )
          }

        
      </nav>
    </header>
  );
}

export default Header;
