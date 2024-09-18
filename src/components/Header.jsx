import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import SearchInput from "./SearchInput";

function Header() {
  const [dados, setDados] = useState({ estado: false, data: null });

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

  function buscar(dado) {
    try {
      fetch(`https://api-e-commerce-m17f.onrender.com/getProducts/${dado}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log(dados.estado);
    if (dados.estado) {
      buscar(dados.data);
    }
  }, [dados]);

  function receberDados(dados) {
    setDados(dados);
  }

  return (
    <header className={style.header}>
      <img src="./src/assets/logo.png" alt="logo" className={style.logoHeader}/>

      <SearchInput/>

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
          </ul>
        </nav>
      </div>

      <div class={style.overlay_menu} id="overlay-menu"></div>

      <nav class={style.nav_desktop}>
        <ul>
            <li>Home</li>
            <li>Cadastrar</li>
            <li>Entrar</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
