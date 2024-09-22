import React, { useState } from "react";
import style from "./Header.module.css";
import SearchInput from "./SearchInput";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  function redirecionarCart() {
    return navigate("/carrinho");
  }

  function abrirMenu() {
    const menu = document.getElementById("menu-mobile");
    const overlay = document.getElementById("overlay-menu");
    overlay.style.display = "block";
    menu.style.display = "block";
  }

  function fecharMenu() {
    const menu = document.getElementById("menu-mobile");
    const overlay = document.getElementById("overlay-menu");
    overlay.style.display = "none";
    menu.style.display = "none";
  }

  async function buscar(dado) {
    try {
      const overlay = document.getElementById("overlay");
      overlay.style.display = "block";
      setLoading(true);

      if (dado) {
        const response = await axios.get(
          `https://api-e-commerce-m17f.onrender.com/getProducts/${dado}`
        );
        console.log(response.data);
      }

      setLoading(false);
      overlay.style.display = "none";
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      overlay.style.display = "none";
    }
  }

  function receberDados(dados) {
    buscar(dados.data);
  }

  return (
    <header className={style.header}>
      <div className="overlayCL" id="overlay"></div>
      {loading && (
        <div className="loadingCL">
          <Loading />
        </div>
      )}
      <Link to="/">
        <img
          src="./src/assets/logo.png"
          alt="logo"
          className={style.logoHeader}
        />
      </Link>

      <SearchInput receberDados={receberDados} />

      <div className={style.btn_abrir} id="btn-abrir" onClick={abrirMenu}>
        <img
          src="./src/assets/icon/menu.png"
          alt="menu"
          className={style.menu}
        />
      </div>

      <div className={style.menu_mobile} id="menu-mobile">
        <div className={style.btn_fechar} id="btn_fechar" onClick={fecharMenu}>
          <img src="./src/assets/icon/close.png" alt="close" />
        </div>

        <nav className={style.nav_mobile} id="nav-mobile">
          {token ? (
            <ul>
              <li onClick={redirecionarCart}>Carrinho</li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/cadastrar" className="link">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link to="/login" className="link">
                  Entrar
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>

      <div className={style.overlay_menu} id="overlay-menu"></div>

      <nav className={style.nav_desktop}>
        {token ? (
          <ul>
            <li className={style.molduraCartHeader} onClick={redirecionarCart}>
              <img src="./src/assets/icon/iconCart.png" />
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/cadastrar" className="link">
                Cadastrar
              </Link>
            </li>
            <li>
              <Link to="/login" className="link">
                Entrar
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
