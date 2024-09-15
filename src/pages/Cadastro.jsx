import React, { useState } from "react";
import style from "./Cadastro.module.css";
import AlertNotification from "../components/AlertNotification";
import SucessNotification from "../components/SucessNotification";
import Loading from "../components/Loading";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState({ estado: false, mensagem: "" });
  const [sucesso, setSucesso] = useState({ estado: false, mensagem: "" });
  const [loading, setLoading] = useState(false);

  function cadastrar(e) {
    e.preventDefault();

    if (!nome || !telefone || !email || !senha) {
      setErro({ estado: true, mensagem: "Preencha todos os campos" });
      return;
    }

    try {
      const overlay = document.getElementById("overlay")
      overlay.style.display = "block"
      setLoading(true);
      fetch("https://api-e-commerce-m17f.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          telefone: telefone,
          email: email,
          password: senha,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status != 201) {
            setLoading(false);
            overlay.style.display = "none"
            return setErro({ estado: true, mensagem: data.message });
          }

          setLoading(false);
          overlay.style.display = "none"
          setSucesso({ estado: true, mensagem: data.message });

        });
    } catch (error) {
      console.log(error);
    }
  }

  function receberDados(dados) {
    setErro(dados);
    setSucesso(dados)
  }

  return (
    <section className={style.sectionForm}>
      <div className={style.overlay} id="overlay"></div>
      {loading && <div className={style.loading}><Loading/></div>}
      <form autoComplete="off" onSubmit={cadastrar} className={style.form}>
        <h1>Cadastro</h1>
        {erro.estado && (
          <AlertNotification message={erro.mensagem} enviarDados={receberDados} />
        )}
        {sucesso.estado && (
          <SucessNotification
            message={sucesso.mensagem}
            enviarDados={receberDados}
          />
        )}
        <div className={style.bloco}>
          <label htmlFor="nome">Nome: </label>
          <input
            placeholder={"Digite seu nome"}
            id="nome"
            type="text"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={style.bloco}>
          <label htmlFor="telefone">Telefone: </label>
          <input
            placeholder="xx xxxxx-xxxx"
            id="telefone"
            type="tel"
            pattern="([0-9]{2}) [0-9]{5}-[0-9]{4}"
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div className={style.bloco}>
          <label htmlFor="email">Email: </label>
          <input
            placeholder="Digite seu e-mail"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.bloco}>
          <label htmlFor="senha">Senha: </label>
          <input
            type="password"
            minLength="8"
            autoComplete="new-password"
            placeholder="Digite sua senha"
            id="senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Cadastro;
