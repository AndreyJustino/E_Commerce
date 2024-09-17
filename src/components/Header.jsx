import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import SearchInput from "./SearchInput";

function Header() {
  const [dados, setDados] = useState({ estado: false, data: null });

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
      <section className={style.sectionHeader}>
        <div className={style.molduraHeader}>
          <img src="./src/assets/logo.png" alt="logo" />
        </div>
        <div className={style.containerHeaderInput}>
          <SearchInput receberDados={receberDados} />
        </div>
        <div className={style.containerPerfil}>
          <div className={style.molduraPerfil}></div>
          <p>nome</p>
        </div>
      </section>
    </header>
  );
}

export default Header;
