import React, { useState } from "react";
import style from "./Cadastro.module.css";
import AlertNotification from "../components/AlertNotification";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState({estado: false, mensagem: ""});

  function cadastrar(e) {
    e.preventDefault();

    if (!nome || !telefone || !email || !senha) {
      setErro({estado:true, mensagem: "Preencha todos os campos"});
      return;
    }

    try {
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
          setErro({estado:true, mensagem: data.message});
        });
    } catch (error) {
      console.log(error);
    }
  }

  function receberDados(dados) {
    setErro(dados);
  }

  return (
    <form autoComplete="off" onSubmit={cadastrar}>
      {erro.estado && (
        <AlertNotification
          message={erro.mensagem}
          enviarDados={receberDados}
        />
      )}

      <div>
        <label htmlFor="nome">Nome: </label>
        <input
          placeholder={"Digite seu nome"}
          id="nome"
          type="text"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="telefone">Telefone: </label>
        <input
          placeholder="xx xxxxx-xxxx"
          id="telefone"
          type="tel"
          pattern="([0-9]{2}) [0-9]{5}-[0-9]{4}"
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          placeholder="Digite seu e-mail"
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
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
  );
}

export default Cadastro;
